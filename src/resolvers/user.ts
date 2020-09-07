import argon2 from 'argon2';
import { Resolver, Mutation, Arg, InputType, Field, Ctx } from 'type-graphql';

import { MyContext } from '../types';
import { User } from '../entities/User';

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Mutation(() => User)
  async register(
    @Arg('options') { username, password }: UsernamePasswordInput,
    @Ctx() { em }: MyContext
  ) {
    const hashedPassword = await argon2.hash(password);
    const user = em.create(User, {
      username,
      password: hashedPassword,
    });
    await em.persistAndFlush(user);

    return user;
  }
}
