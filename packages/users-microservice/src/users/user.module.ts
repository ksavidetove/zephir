import { UserResolver } from './user.resolver';
import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '@database/entities/user.entity';
import { AnagramEntity } from '@database/entities/anagram.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, AnagramEntity])],
  providers: [UserResolver, UserService],
})
export class UserModule {}
