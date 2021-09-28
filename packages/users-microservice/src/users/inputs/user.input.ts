import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field(() => String, { description: 'email address of the user' })
  email: string;
}
