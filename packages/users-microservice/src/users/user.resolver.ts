import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UserEntity } from '@database/entities/user.entity';
import { UserInput } from './inputs/user.input';
import { UserService } from './user.service';
import { CreateUser, User } from 'zefir-common';
import { PubSub } from 'graphql-subscriptions';

// @Resolver((of) => UserEntity)
// export class UserResolver {
//   constructor(private readonly userService: UserService) {}
//
//   @Query(() => [User])
//   async users() {
//     const res = await this.userService.getUsers();
//     return res;
//   }
//
//   @Mutation(() => CreateUser)
//   async createUser(@Args('data') data: UserInput) {
//     const user = await this.userService.createUser(data);
//     return user;
//   }
// }
@Resolver('users')
export class UserResolver {
  pubSub: PubSub;

  constructor(private readonly userService: UserService) {
    this.pubSub = new PubSub();
  }

  @Subscription(() => User)
  userCreated() {
    return this.pubSub.asyncIterator('userCreated');
  }

  @Query(() => [User])
  async users() {
    const res = await this.userService.getUsers();
    return res;
  }

  @Mutation(() => CreateUser)
  async createUser(@Args('data') data: UserInput) {
    const { user, anagram } = await this.userService.createUser(data);

    await this.pubSub.publish('userCreated', {
      userCreated: new User(user.email, user.fib, anagram.anagram_map),
    });

    return user;
  }
}
