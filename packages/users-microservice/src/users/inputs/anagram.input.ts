import { InputType, Int, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
class AnagramCount {
  @Field(() => String, { description: 'One of the multiple anagrams as key' })
  key: string;
  @Field(() => Int, { description: 'count of anagrams' })
  count: number;
}

@InputType()
export class Anagram {
  @Field(() => Int, { description: 'foreign key id of the related user' })
  user_id: number;
  @Field(() => Array, { description: 'email address of the user' })
  anagram_map: [AnagramCount];
}
