import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PostOutput {
  @Field(() => Int)
  id: number;

  @Field()
  body: string;

  @Field({ nullable: true })
  filePath?: string;

  @Field(() => String, { nullable: true })
  get fileUrl(): string | null {
    if (!this.filePath) return null;
    return `${process.env.BASE_URL || 'http://localhost:3000'}${this.filePath}`;
  }

  @Field(() => Date)
  createdAt: Date;

  @Field(() => Date)
  updatedAt: Date;
}
