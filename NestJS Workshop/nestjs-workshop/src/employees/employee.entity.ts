import { PayType } from './../common/enums/pay-type.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Department } from '../departments/department.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({
    type: String,
    example: '51546eab-1ebe-400e-b8cf-2ce48b02f993',
  })
  id: string;

  @Column({
    name: 'employee_name',
    type: String,
    length: 30,
  })
  @ApiProperty({
    type: String,
    example: 'John Doe',
  })
  employeeName: string;

  @Column({
    name: 'email',
  })
  @ApiProperty({
    type: String,
    example: 'johndoe@gmail.com',
  })
  email: string;

  @Column({
    name: 'phone_number',
  })
  @ApiProperty({
    type: Number,
    example: 40712345678,
  })
  phone: number;

  @Column({
    name: 'hire_date',
  })
  @ApiProperty({
    type: String,
    example: '2024-05-07T08:10:25.116Z',
  })
  hireDate: string;

  @Column({
    name: 'job_title',
  })
  @ApiProperty({
    type: String,
    example: 'Software Developer',
  })
  jobTitle: string;

  // @Column({
  //     name: "department"
  // })
  // @ApiProperty({
  //     type: String,
  //     example: "IT"
  //     })
  // department: string

  @Column({
    name: 'pay_rate',
  })
  @ApiProperty({
    type: Number,
    example: 1000,
  })
  payRate: number;

  @Column({
    enum: PayType,
    enumName: 'pay_type',
  })
  @ApiProperty({
    enum: PayType,
    example: PayType.MONTHLY,
  })
  payType: PayType;

  @Column({
    name: 'is_active',
  })
  @ApiProperty({
    type: Boolean,
    example: 'true',
  })
  isActive: boolean;

  @ManyToOne(() => Department, (department) => department.employees)
  @JoinColumn({
    name: 'department_id',
  })
  @ApiPropertyOptional({
    type: Department,
  })
  department: Department;

  @Column({
    nullable: true,
    name: 'department_id',
  })
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'The ID of the club where the player actively plays at.',
    example: '51546eab-1ebe-400e-b8cf-2ce48b02f993',
  })
  departmentId: string | null;

  @Column({
    type: String,
    nullable: true,
    name: 'created_by',
  })
  @ApiProperty({
    type: String,
    nullable: true,
    description: 'Employee created by user with this email',
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
}

// Name e.g. "John Doe"
// Email e.g. "john.doe@example.com"
// Phone e.g. "+40712345678"
// Hire Date e.g. "2024-05-07T08:10:25.116Z"
// Job Title e.g. "Software Developer"
// Department e.g. (see below for department details)
// Pay Rate e.g. 1000
// Pay Type e.g. "hourly" | "weekly" | "monthly"
// Is Active e.g. true
