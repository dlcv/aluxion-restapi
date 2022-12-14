import { Entity, Column, PrimaryColumn } from 'typeorm'

@Entity({
  name: 'files'
})
export class File {
  
  @PrimaryColumn("uuid")
  id: string;

  // Real name of the file
  @Column({
    length: 100,
  })
  name: string;

  // File size (in kilobytes)
  @Column()
  size: number;

  // File/object path in S3
  @Column({
    length: 255,
  })
  path: string;

  // The file is visible or not for logical deletion
  @Column({
    name: "is_visible",
    default: true
  })
  isVisible: boolean = true;

  @Column({
    type: 'datetime',
    name: "created_at",
    default: () => 'CURRENT_TIMESTAMP'
  })
  createdAt: Date
}