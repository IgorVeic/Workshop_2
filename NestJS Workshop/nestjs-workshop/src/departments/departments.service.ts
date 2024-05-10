import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { PageOptionsDto } from 'src/pagination/page-options.dto';
import { DepartmentQueryDto } from './dtos/department-query.dto';
import { PageDto } from '../pagination/page.dto';
import { PageMetaDto } from '../pagination/page-meta-dto';
import { DepartmentCreateDto } from './dtos/department-create.dto';
import { ICurrentUser } from '../types/current-user.interface';
import { DepartmentUpdateDto } from './dtos/department-update.dto';

@Injectable()
export class DepartmentsService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  private departments: Department[] = [];

  async getAllDepartments(
    pageOptionsDto: PageOptionsDto,
    { departmentName, officeLocation }: DepartmentQueryDto,
  ): Promise<PageDto<Department>> {
    const queryBuilder =
      this.departmentRepository.createQueryBuilder('department');

    if (departmentName) {
      queryBuilder.where('department.departmentName ILIKE = :departmentName', {
        departmentName: `%${departmentName}%`,
      });
    }

    if (officeLocation) {
      queryBuilder.where('department.officeLocation ILIKE  :officeLocation', {
        officeLocation: `%${officeLocation}%`,
      });
    }

    queryBuilder
      .orderBy('department.budget', pageOptionsDto.order)
      .leftJoinAndSelect('department.employees', 'employees')
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async getDepartment(id: string): Promise<Department> {
    return this.departmentRepository.findOneByOrFail({ id });
  }

  async createDepartment(
    body: DepartmentCreateDto,
    user: ICurrentUser,
  ): Promise<Department> {
    console.log('Created by user:', user);

    // Check if the department with the same name already exists
    const existingDepartment = await this.departmentRepository.findOne({
      where: { departmentName: body.departmentName },
    });
    if (existingDepartment) {
      throw new HttpException(
        'Department with the same name already exists in the database! 🚫',
        HttpStatus.BAD_REQUEST,
      );
    }

    const department = this.departmentRepository.create({
      ...body,
      createdBy: user.username,
    });

    return await this.departmentRepository.save(department);
  }

  async updateDepartment(
    id: string,
    body: DepartmentUpdateDto,
  ): Promise<Department> {
    const department = await this.departmentRepository.findOneByOrFail({ id });
    const updatedDepartment = this.departmentRepository.merge(department, body);

    return this.departmentRepository.save(updatedDepartment);
  }

  async deleteDepartment(id: string): Promise<void> {
    await this.departmentRepository.softDelete(id);
  }
}
