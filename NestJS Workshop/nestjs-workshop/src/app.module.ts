import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmployeesModule } from './employees/employees.module';
import { DepartmentsModule } from './departments/departments.module';


@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // makes the config module accessible through the whole app
  }),
    DatabaseModule,
    AuthModule,
    EmployeesModule,
    DepartmentsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
