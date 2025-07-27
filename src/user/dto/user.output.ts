import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class UserOutput {
  @Field(() => Int)
  id: number;

  @Field({ nullable: true })
  name: string;

  @Field()
  username: string;

  @Field()
  email: string;

  imagePath?: string;

  @Field(() => String, { nullable: true })
  get image(): string | null {
    if (!this.imagePath) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}${this.imagePath}`;
  }
}
