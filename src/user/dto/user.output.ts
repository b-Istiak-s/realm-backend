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

  image?: string;

  @Field(() => String, { nullable: true })
  get imagePath(): string | null {
    if (!this.image) return null;
    return `${process.env.FRONTEND_URL || 'http://localhost:3000'}${this.image}`;
  }
}
