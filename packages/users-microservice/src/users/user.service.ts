import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserInput } from './inputs/user.input';
import { writeAnagramsFile } from '@core/utils/functions.utils';
import * as util from 'util';
import { reduceWords } from '@core/utils/reduce.utils';
import coreConfig from '@core/config/core.config';
import { ConfigType } from '@nestjs/config';
import { AnagramEntity, UserEntity } from '@database/entities';
import { User } from 'zefir-common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(AnagramEntity)
    private readonly anagramRepository: Repository<AnagramEntity>,
    @Inject(coreConfig.KEY)
    private readonly config: ConfigType<typeof coreConfig>,
  ) {}

  async createUser(
    data: UserInput,
  ): Promise<{ user: UserEntity; anagram: AnagramEntity }> {
    const writeAnagramsFileAsync = util.promisify(writeAnagramsFile);
    const filename = Date.now().toString();

    await writeAnagramsFileAsync(this.config.nbWords, filename);

    let user = UserEntity.createUserEntity(data.email);
    user = await this.userRepository.save(user);

    const anagrams = await reduceWords(filename);
    const anagramEntity = AnagramEntity.createAnagramEntity(user, anagrams);
    const anagram = await this.anagramRepository.save(anagramEntity);

    return { user, anagram };
  }

  async getUsers(): Promise<User[]> {
    const anagrams = await this.anagramRepository.find({ relations: ['user'] });
    return anagrams.map(
      (anagram) =>
        new User(anagram.user.email, anagram.user.fib, anagram.anagram_map),
    );
  }
}
