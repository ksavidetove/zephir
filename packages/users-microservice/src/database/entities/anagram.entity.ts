import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';
import { AnagramCount } from 'zefir-common';

@Entity('anagrams')
export class AnagramEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column({ type: 'jsonb', nullable: false })
  anagram_map: AnagramCount[];

  public static createAnagramEntity(
    user: UserEntity,
    anagramMap: AnagramCount[],
  ): AnagramEntity {
    const anagram = new AnagramEntity();
    anagram.anagram_map = anagramMap;
    anagram.user = user;

    return anagram;
  }
}
