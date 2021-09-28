import { ObjectType, Field, OmitType } from '@nestjs/graphql';
import { AnagramCount } from './anagram.dto';
import { CreateUser } from './createUser.dto';

@ObjectType()
export class User extends OmitType(CreateUser, ['id'] as const) {
  @Field(() => [AnagramCount], { description: 'email address of the user' })
  anagram_map: AnagramCount[];

  constructor(email: string, fib: number, anagram_map: AnagramCount[]) {
    super();
    this.email = email;
    this.fib = fib;
    this.anagram_map = anagram_map;
  }
}
