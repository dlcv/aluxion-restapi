import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { File } from '../files/file.entity'

@Entity({
  name: 'users'
})
export class User {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 150
  })
  firstName: string

  @Column({
    length: 150
  })
  lastName: string

  @Column({
    length: 150,
    unique: true,
  })
  email: string

  @Column()
  password: string

  @Column({
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column({
    type: 'datetime'
  })
  updatedAt: Date

  @OneToMany(() => File, file => file.user)
  files: File[]

}