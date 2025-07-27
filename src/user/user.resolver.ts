import { Query, Mutation, Args, Int, Resolver, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserOutput } from './dto/user.output';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { AuthTokenService } from './auth/auth-token.service';
import { LoginOutput } from './dto/login.output';
import { UserPaginatedOutput } from './dto/user-paginated.output';
import { LoginInput } from './dto/login.input';
import { UpdateUserInput } from './dto/update-user.input';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.mjs';
import type { FileUpload } from 'graphql-upload/processRequest.mjs';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  // Queries
  @Query(() => UserPaginatedOutput, { name: 'usersPaginated' })
  async getUsersPaginated(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
  ): Promise<UserPaginatedOutput> {
    const { users, total } = await this.userService.findAllWithCount({
      limit,
      offset,
    });
    return { users, total };
  }

  @Query(() => UserOutput, { name: 'user', nullable: true })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  // Mutations
  @Mutation(() => UserOutput)
  async createUser(@Args('input') input: CreateUserInput) {
    return this.userService.create(input);
  }

  @Mutation(() => LoginOutput)
  async loginUser(@Args('input') input: LoginInput): Promise<LoginOutput> {
    const user = await this.userService.validate(
      input.username,
      input.password,
    );
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const accessToken = await this.authTokenService.createToken(user.id);

    return { id: user.id, accessToken };
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserOutput)
  async updateUser(
    @Args('input') input: UpdateUserInput,
    @Args({ name: 'image', type: () => GraphQLUpload, nullable: true })
    image?: Promise<FileUpload>,
    @Context('req') req?: any,
  ) {
    return this.userService.update(input, image, req);
  }
}
