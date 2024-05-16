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
} from "class-validator";
import { PayType } from '../../common/enums/pay-type.enum';
import { Unique } from 'typeorm';

export class EmployeeUpdateDto {

    @IsString()
    @IsNotEmpty()
    @Length(3, 30)
    @Transform(({ value }) => value.trim())
    @ApiProperty({
      type: String,
      example: 'Igor Veic',
      description: 'Name of the employee',
    })
    employeeName?: string


    @IsEmail()
    @IsNotEmpty()
    @Unique(['email'])
    @ApiProperty({
        type: String,
        example: 'johndoe@gmail.com',
        description: 'Email of the employee',
      })
    email?: string

    @IsOptional()
    @IsNotEmpty()
      @IsNumber()
      @Min(5)
      @ApiProperty({
        type: Number,
        example: 0,
        description: 'Employee phone number',
      })
    phone?: number

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: '2024-05-07T08:10:25.116Z',
        description: 'Date when the employee was hired',
      })
    hireDate?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Software Developer',
        description: 'Job title of the employee',
      })
    jobTitle?: string

    // @IsOptional()
    // @IsString()
    // @IsNotEmpty()
    // @ApiProperty({
    //     type: String,
    //     example: 'IT',
    //     description: 'The department where the employee is working',
    //   })
    // department?: string

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
      @IsNumber()
      @Min(100)
      @ApiProperty({
        type: Number,
        example: 500,
        description: 'The pay rate of the employee',
      })
    payRate?: number

    @IsOptional()
    @IsEnum(PayType)
    @ApiProperty({
      enum: PayType,
      description: 'The payment frequency for the employee, such as hourly, monthly, or annually',
      example: PayType.HOURLY,
      required: true,
    })
    payType?: PayType

    @IsOptional()
    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({
      type: Boolean,
      example: true,
      description: 'Indicates whether the employee is currently active',
    })
isActive?: boolean
}
