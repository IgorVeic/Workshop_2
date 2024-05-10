import { EmployeeCreateDto } from "./employee-create.dto";

export class EmployeeResponseDto extends EmployeeCreateDto {
id: string;
createdAt: Date;
updatedAt: Date;
}