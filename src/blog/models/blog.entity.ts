import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../auth/models/user.entity';

@Entity('todos')
export class BlogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  text: string;

  @Column({ type: 'datetime' })
  date: Date;

  @Column({ type: 'datetime' })
  editDate: Date;

  @Column({ type: 'boolean' })
  isDraft: boolean;

  @ManyToOne(() => UserEntity, (user) => user.blogs)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
