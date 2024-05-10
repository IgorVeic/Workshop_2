import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Query,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from '@nestjs/common';
import { ICurrentUser } from '../types/current-user.interface';
import { TrimStringsPipe } from '../pipes/trim-strings.pipe';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guard/jwt.guard';
import { RolesGuard } from 'src/guard/roles.guard';
import { Roles } from '../common/enums/decorators/roles.decorator';
import { Employee } from './employee.entity';
import { EmployeeQueryDto } from './dtos/employee-query.dto';
import { Role } from '../common/enums/role.enum';
import { EmployeeCreateDto } from './dtos/employee-create.dto';
import { CurrentUser } from '../common/enums/decorators/current-user.decorator';
import { EmployeeUpdateDto } from './dtos/employee-update.dto';
import { EmployeesService } from './employees.service';


@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard) 
@UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
)
        
@ApiTags('Employees')   
@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) { }
    
    @Get("/")
    @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
      @ApiOperation({ summary: 'Get All Employees' })
      @ApiOkResponse({
        type: [Employee],
        description: 'All employees retrieved successfully ✅',
      })
      getAllEmployees(@Query() query:EmployeeQueryDto): Promise<Employee[]> {
        return this.employeesService.getAllEmployees(query);
    }
    
    @Get("/:id")
    @Roles(Role.USER, Role.ADMIN, Role.MODERATOR)
    @ApiOperation({ summary: 'Get single employee' })
    @ApiOkResponse({
      type: [Employee],
      description: 'Single employee retrieved successfully ✅',
    })
    @ApiParam({
      name: "id",
      type: String,
      description: "employeeId"
    })
    getSingleEmployee(@Param("id") id: string) {
      return this.employeesService.getSingleEmployee(id)
      }
    
    @Post('/')
    @Roles(Role.ADMIN, Role.MODERATOR)
      @ApiOperation({ summary: 'Create a new employee' })
      @ApiCreatedResponse({
        type: Employee,
        description: 'Employee created successfully ✅',
      })
    @ApiBody({ type: EmployeeCreateDto })
    @UsePipes(new TrimStringsPipe())
      createEmployee(@Body() body: EmployeeCreateDto,  @CurrentUser() user: ICurrentUser | undefined): Promise<Employee> {
        return this.employeesService.createEmployee(body, user);
      }
    
    @Put('/:id')
    @Roles(Role.ADMIN, Role.MODERATOR)
      @ApiOperation({ summary: 'Update an employee' })
      @ApiOkResponse({
        type: Employee,
        description: 'Employee updated successfully ✅',
      })
      @ApiBody({ type: EmployeeUpdateDto })
      @ApiParam({ name: 'id', type: 'string' })
      @UsePipes(new TrimStringsPipe())
      updateEmployee(
        @Param('id') id: string,
        @Body() body: EmployeeUpdateDto,
      ): Promise<Employee> {
        return this.employeesService.updateEmployee(id, body);
      }
    
    @Delete('/:id')
    @Roles(Role.ADMIN)
      @ApiOperation({ summary: 'Delete an employee 🗑️' })
      @ApiResponse({
        status: 204,
        description: 'Employee deleted successfully ✅',
      })
      @ApiParam({ name: 'id', type: 'string' })
      deleteEmployee(@Param('id') id: string): Promise<void> {
        return this.employeesService.deleteEmployee(id);
      }
}
