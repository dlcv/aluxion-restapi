import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { File } from '../files/file.entity'

@Entity({
  name: 'users'
})
export class User {
  
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    length: 150,
    name: 'first_name',
  })
  firstName: string

  @Column({
    length: 150,
    name: 'last_name',
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
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date

  @Column({
    type: 'datetime',
    name: 'updated_at',
  })
  updatedAt: Date

  @OneToMany(() => File, file => file.user)
  files: File[]

  @Column({
    type: 'uuid',
    unique: true,
    nullable: true,
    name: 'reset_password_token'
  })
  resetPasswordToken: string

}