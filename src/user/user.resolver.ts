import { Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserOutput } from './dto/user.output';
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { AuthTokenService } from './auth/auth-token.service';
import { LoginOutput } from './dto/login.output';

export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authTokenService: AuthTokenService,
  ) {}

  // Queries
  @Query(() => [UserOutput], { name: 'users' })
  async getUsers(
    @Args('limit', { type: () => Int, nullable: true, defaultValue: 10 })
    limit: number,
    @Args('offset', { type: () => Int, nullable: true, defaultValue: 0 })
    offset: number,
  ) {
    return this.userService.findAll({ limit, offset });
  }

  @Query(() => UserOutput, { name: 'user', nullable: true })
  async getUser(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  // Mutations
  @Mutation(() => UserOutput)
  async createUser(@Args('input') input: CreateUserInput) {
    const hashedPassword = await bcrypt.hash(input.password, 10); // 10 = salt rounds

    const newUser = {
      username: input.username,
      email: input.email,
      password: hashedPassword,
    };
    return this.userService.create(newUser);
  }

  @Mutation(() => LoginOutput)
  async loginUser(
    @Args('username') username: string,
    @Args('password') password: string,
  ) {
    const user = await this.userService.validate(username, password);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const accessToken = await this.authTokenService.createToken(user.id);

    return { accessToken };
  }
}
