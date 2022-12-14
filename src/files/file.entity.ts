import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'
import { User } from '../users/user.entity';

@Entity({
  name: 'files'
})
export class File {
  
  @PrimaryColumn('uuid')
  id: string;

  @Column({
    length: 100,
  })
  name: string;

  @Column()
  size: number;

  @Column({
    length: 255,
  })
  key: string;

  @Column({
    length: 255,
  })
  url: string;

  @Column({
    name: 'is_visible',
    default: true
  })
  isVisible: boolean = true;

  @Column({
    type: 'datetime',
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @ManyToOne(() => User, user => user.files)
  user: User

  @Column({
    name: 'user_id'
  })
  userId: number
}