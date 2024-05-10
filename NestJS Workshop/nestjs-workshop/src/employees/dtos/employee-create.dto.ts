import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';
import { PayType } from '../../common/enums/pay-type.enum';
import { Unique } from 'typeorm';

// Name e.g. "John Doe"
// Email e.g. "john.doe@example.com"
// Phone e.g. "+40712345678"
// Hire Date e.g. "2024-05-07T08:10:25.116Z"
// Job Title e.g. "Software Developer"
// Department e.g. (see below for department details)
// Pay Rate e.g. 1000
// Pay Type e.g. "hourly" | "weekly" | "monthly"
// Is Active e.g. true

export class EmployeeCreateDto {
  @IsString()
  @IsNotEmpty()
  @Length(3, 30)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    example: 'Igor Veic',
    description: 'Name of the employee',
  })
  employeeName: string;

  @IsEmail()
  @IsNotEmpty()
  @Unique(['email'])
  @ApiProperty({
    type: String,
    example: 'johndoe@gmail.com',
    description: 'Email of the employee',
  })
  email: string;

  @IsInt()
  @IsNotEmpty()
  @IsNumber()
  @Min(5)
  @ApiProperty({
    type: Number,
    example: 0,
    description: 'Employee phone number',
  })
  phone: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: '2024-05-07T08:10:25.116Z',
    description: 'Date when the employee was hired',
  })
  hireDate: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Software Developer',
    description: 'Job title of the employee',
  })
  jobTitle: string;

  // @IsString()
  // @IsNotEmpty()
  // @ApiProperty({
  //     type: String,
  //     example: 'IT',
  //     description: 'The department where the employee is working',
  //   })
  // department: string

  @IsInt()
  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  @ApiProperty({
    type: Number,
    example: 500,
    description: 'The pay rate of the employee',
  })
  payRate: number;

  @IsEnum(PayType)
  @ApiProperty({
    enum: PayType,
    description:
      'The payment frequency for the employee, such as hourly, monthly, or annually',
    example: PayType.HOURLY,
    required: true,
  })
  payType: PayType;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: Boolean,
    example: true,
    description: 'Indicates whether the employee is currently active',
  })
  isActive: boolean;

  @IsOptional()
  @IsUUID()
  @ApiPropertyOptional({
    type: String,
    description: 'The ID of the department where the employee works',
    example: '22964c0d-6a0a-4ca8-a52d-e9d68662e908',
  })
  departmentId?: string;
}
