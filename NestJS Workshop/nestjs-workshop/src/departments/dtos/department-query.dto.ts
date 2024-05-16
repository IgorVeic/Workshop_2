import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsInt, IsOptional, IsString } from "class-validator"

export class DepartmentQueryDto {
    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: "Search department by name"
    })
    departmentName?: string

    @IsOptional()
    @IsString()
    @ApiProperty({
        type: String,
        description: "Search by office location"
    })
    officeLocation?: string


    @IsOptional()
    @IsString()
    @ApiProperty({
      type: Boolean,
      description: 'Check if the department is active',
    })
    isActive?: boolean


    @IsOptional()
    @IsInt()
    @Type(() => Number)
    minBudget?: number

    @IsOptional()
    @IsInt()
    @Type(() => Number)
    maxBudget?: number
}

// name and office location