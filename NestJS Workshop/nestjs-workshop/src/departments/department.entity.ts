import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Employee } from '../employees/employee.entity';

// Name e.g. "IT"
// Description e.g. "Information Technology Department"
// Is Active e.g. true
// Employees e.g. (see above for employee details)
// Office Location e.g. "New York"
// Budget e.g. 100000

@Entity()
export class Department {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    example: '51546eab-1ebe-400e-b8cf-2ce48b02f993',
  })
  id: string;

  @Column({
    name: 'department_name',
  })
  @ApiProperty({
    type: String,
    example: 'IT',
  })
  departmentName: string;

  @Column()
  @ApiProperty({
    type: String,
    example: 'Information Technology Department',
  })
  descrpition: string;

  @Column({
    name: 'is_active',
  })
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  isActive: boolean;

  @Column({
    name: 'office_location',
  })
  @ApiProperty({
    type: String,
    example: 'London',
  })
  officeLocation: string;

  @Column({
    name: 'budget',
  })
  @ApiProperty({
    type: Number,
    example: 100000,
  })
  budget: number;
  // @OneToMany(() => Song, (song) => song.artist)
  // @ApiPropertyOptional({
  //     type: [Song],
  //   })
  //   songs: Song[]; // this is not a column in the database, but a property that will be populated with the players data when we fetch a song

  //   @OneToMany(() => Album, (album) => album.artist)
  //   @ApiPropertyOptional({
  //       type: [Album],
  //     })
  //     albums: Album[];

  @Column({
    type: String,
    nullable: true,
    name: 'created_by',
  })
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Department created by user identified by this email',
    example: 'user@example.com',
  })
  createdBy: string | null;

  @CreateDateColumn({
    name: 'created_at',
  })
  @ApiProperty({
    type: Date,
    example: '1878-01-01 00:00:00',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
  })
  @ApiProperty({
    type: Date,
    example: '1878-01-01 00:00:00',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
  })
  @ApiProperty({
    type: Date,
    nullable: true,
    example: '1878-01-01 00:00:00',
  })
  deletedAt: Date;

  @OneToMany(() => Employee, (employee) => employee.department)
  @ApiPropertyOptional({
    type: Employee,
  })
  employees: Employee[];
}
