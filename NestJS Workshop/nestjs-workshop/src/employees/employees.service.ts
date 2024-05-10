import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './employee.entity';
import {
  Between,
  FindOptionsWhere,
  ILike,
  LessThanOrEqual,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { EmployeeUpdateDto } from './dtos/employee-update.dto';
import { EmployeeCreateDto } from './dtos/employee-create.dto';
import { ICurrentUser } from '../types/current-user.interface';
import { EmployeeQueryDto } from './dtos/employee-query.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  private employee: Employee[] = [];

  async getAllEmployees({
    employeeName,
    payType,
    isActive,
    jobTitle,
    maxPay,
    minPay,
  }: EmployeeQueryDto): Promise<Employee[]> {
    let whereQuery = {} satisfies FindOptionsWhere<Employee>;

    if (employeeName) {
      whereQuery = {
        ...whereQuery,
        employeeName: ILike(`%${employeeName}%`),
      };
    }

    if (jobTitle) {
      whereQuery = {
        ...whereQuery,
        jobTitle: ILike(`%${jobTitle}%`),
      };
    }

    if (maxPay && minPay) {
      whereQuery = {
        ...whereQuery,
        payRate: Between(maxPay, minPay),
      };
      // If only minAge is provided, we use the MoreThanOrEqual operator to search for players with an age greater than or equal to minAge.
    } else if (maxPay) {
      whereQuery = {
        ...whereQuery,
        payRate: MoreThanOrEqual(maxPay),
      };
      // If only maxAge is provided, we use the LessThanOrEqual operator to search for players with an age less than or equal to maxAge.
    } else if (minPay) {
      whereQuery = {
        ...whereQuery,
        payRate: LessThanOrEqual(minPay),
      };
    }

    if (isActive !== undefined) {
      whereQuery = {
        ...whereQuery,
        isActive: isActive,
      };
    }

    return this.employeeRepository.find({
      where: whereQuery,
      relations: ['department'],
    });
  }

  async getSingleEmployee(id: string): Promise<Employee> {
    const singleEmployee = await this.employeeRepository.find({
      where: { id },
      relations: ['department'],
    });
    return singleEmployee[0];
  }

  async createEmployee(
    body: EmployeeCreateDto,
    user: ICurrentUser,
  ): Promise<Employee> {
    console.log('Created by user:', user);

    // Check if an employee with the same name already exists
    const existingEmployee = await this.employeeRepository.findOne({
      where: { employeeName: body.employeeName },
    });
    if (existingEmployee) {
      throw new HttpException(
        'An employee with that name already exists in the database! 🚫',
        HttpStatus.BAD_REQUEST,
      );
    }

    const bodyWithCreatedBy = {
      ...body,
      createdBy: user.username,
    };
    const newEmployee: Employee =
      this.employeeRepository.create(bodyWithCreatedBy);
    return this.employeeRepository.save(newEmployee);
  }

  async updateEmployee(id: string, body: EmployeeUpdateDto): Promise<Employee> {
    const employee = await this.employeeRepository.findOneByOrFail({ id });
    const updatedEmployee = this.employeeRepository.merge(employee, body);
    return this.employeeRepository.save(updatedEmployee);
  }

  async deleteEmployee(id: string): Promise<void> {
    await this.employeeRepository.softDelete(id);
  }
}
