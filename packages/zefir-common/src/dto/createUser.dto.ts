import { ObjectType, Field } from '@nestjs/graphql';
import { Float } from '@nestjs/graphql/dist/scalars';

@ObjectType()
export class CreateUser {
  @Field(() => Float, { description: 'primary key autoincremented' })
  id: number;
  @Field(() => String, { description: 'email address of the user' })
  email: string;
  @Field(() => Float, { description: 'result of fibonacci' })
  fib: number;
}
