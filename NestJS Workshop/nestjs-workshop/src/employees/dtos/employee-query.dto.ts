import { PayType } from './../../common/enums/pay-type.enum';
import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class EmployeeQueryDto {
  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Search employee by name',
  })
  employeeName?: string;

  @IsOptional()
  @IsEnum(PayType)
  @ApiProperty({
    enum: PayType,
  })
  payType?: PayType;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: Boolean,
    description: 'Check if the employee is active',
  })
  isActive?: boolean;

  @IsOptional()
  @IsString()
  @ApiProperty({
    type: String,
    description: 'Search employee by job title',
  })
  jobTitle?: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  maxPay?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  minPay?: number;
}
