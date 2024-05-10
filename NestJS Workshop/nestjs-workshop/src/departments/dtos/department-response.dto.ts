import { DepartmentCreateDto } from "./department-create.dto";

export class DepartmentResponseDto extends DepartmentCreateDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    }