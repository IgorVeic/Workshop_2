import { ApiProperty } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

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
}

// name and office location