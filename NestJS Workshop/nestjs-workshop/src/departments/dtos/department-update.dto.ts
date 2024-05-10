import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  Min,
} from 'class-validator';

// Name e.g. "IT"
// Description e.g. "Information Technology Department"
// Is Active e.g. true
// Employees e.g. (see above for employee details)
// Office Location e.g. "New York"
// Budget e.g. 100000

export class DepartmentUpdateDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Length(2, 50)
  @Transform(({ value }) => value.trim())
  @ApiProperty({
    type: String,
    example: 'IT',
    description: 'Name of the department',
  })
  departmentName?: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'Information Technology Department',
    description: 'Description of the department',
  })
  descrpition?: string;

  @IsOptional()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: true,
    description: 'Is the department active',
  })
  isActive?: boolean;

  // employees

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    example: 'New York',
    description: 'The location of the office',
  })
  officeLocation?: string;

  @IsOptional()
  @IsInt()
  @IsNotEmpty()
  @IsNumber()
  @Min(100)
  @ApiProperty({
    type: Number,
    example: 100000,
    description: 'The budget of the department',
  })
  budget?: number;
}
