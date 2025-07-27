import { ObjectType, Field, Int } from '@nestjs/graphql';
import * as dotenv from 'dotenv';
dotenv.config();

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

  @Field({ nullable: true })
  image?: string;

  @Field(() => String, { nullable: true })
  get imagePath(): string | null {
    if (!this.image) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}${this.image}`;
  }
}
