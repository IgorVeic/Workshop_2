import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt.guard';
import { RolesGuard } from '../guard/roles.guard';
import { DepartmentsService } from './departments.service';
import { Roles } from '../common/enums/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { Department } from './department.entity';
import { PageDto } from '../pagination/page.dto';
import { PageOptionsDto } from '../pagination/page-options.dto';
import { DepartmentQueryDto } from './dtos/department-query.dto';
import { DepartmentCreateDto } from './dtos/department-create.dto';
import { TrimStringsPipe } from '../pipes/trim-strings.pipe';
import { CurrentUser } from '../common/enums/decorators/current-user.decorator';
import { ICurrentUser } from '../types/current-user.interface';
import { DepartmentUpdateDto } from './dtos/department-update.dto';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      transform: true,
    }),
)

@ApiTags('Departments')
@Controller('departments')
export class DepartmentsController {
  constructor(private readonly departmentsService: DepartmentsService) { }
  
  @Get('/')
  @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Get all departments 🎶' })
  @ApiOkResponse({
    description: 'All departments are retrieved ✅',
    type: [Department],
  })
  getAllDepartments(@Query() pageOptionsDto: PageOptionsDto, @Query() queries: DepartmentQueryDto): Promise<PageDto<Department>> {
    return this.departmentsService.getAllDepartments(pageOptionsDto, queries);
  }
    

  @Get('/:id')
  @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Get a department' })
  @ApiOkResponse({
    description: 'Department with certain ID is retrieved ✅',
    type: Department,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Department ID',
  })
  getDepartment(@Param('id') id: string): Promise<Department> {
    return this.departmentsService.getDepartment(id);
  }

  @Post('/')
  @Roles(Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Create a new department' })
  @ApiCreatedResponse({
    description: 'The department has been created successfully ✅',
    type: Department,
  })
  @ApiBody({
    type: DepartmentCreateDto,
  })
  @UsePipes(new TrimStringsPipe())
  createDepartment(@Body() body: DepartmentCreateDto, @CurrentUser() user: ICurrentUser | undefined): Promise<Department> {
    return this.departmentsService.createDepartment(body, user);
  }

  @Put('/:id')
  @Roles(Role.ADMIN, Role.MODERATOR)
  @ApiOperation({ summary: 'Update a department' })
  @ApiResponse({
    status: 200,
    description: 'Updated department successfully ✅',
    type: Department,
  })
  @ApiBody({
    type: DepartmentUpdateDto,
  })
  @ApiParam({
    name: 'id',
    type: String,
    description: 'Department ID',
  })
  @UsePipes(new TrimStringsPipe())
  updateDepartment(
    @Param('id') id: string,
    @Body() body: DepartmentUpdateDto,
  ): Promise<Department> {
    return this.departmentsService.updateDepartment(id, body);
  }

  @Delete('/:id')
  @Roles(Role.ADMIN)
  @ApiOperation({
    summary: 'Delete a department',
  })
  @ApiResponse({
    status: 204,
    description: 'Successfully deleted a department ✅',
  })
  @ApiParam({ name: 'id', type: 'string' })
  deleteDepartment(@Param('id') id: string): Promise<void> {
    return this.departmentsService.deleteDepartment(id);
  }
}
