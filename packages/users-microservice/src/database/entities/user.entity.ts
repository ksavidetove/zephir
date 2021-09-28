import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { fibonacci, getRandomNumber } from '@core/utils/functions.utils';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('increment')
  id: string;

  @Column('varchar', { unique: true })
  email: string;

  @Column('numeric')
  fib: number;

  public static createUserEntity(email: string) {
    const user = new UserEntity();
    user.email = email;
    const randNumber = getRandomNumber(50, 51);
    user.fib = fibonacci(randNumber, []);

    return user;
  }
}
