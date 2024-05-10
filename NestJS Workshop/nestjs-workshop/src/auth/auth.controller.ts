import {
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
  } from '@nestjs/swagger';
  import { RegisterDto } from './dtos/register.dto';
  import { LoginDto } from './dtos/login.dto';
  import { AuthService } from './auth.service';
  import { UserResponseDto } from '../user/dtos/user-response.dto';
  
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @ApiTags('Authentication 🔐')
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('/register')
    @ApiOperation({ summary: 'Register a new user for the app 📝' })
    @ApiCreatedResponse({
      type: UserResponseDto,
      description: 'User successfully registered ✅',
    })
    @ApiBody({ type: RegisterDto })
    register(@Body() body: RegisterDto): Promise<UserResponseDto> {
      return this.authService.register(body);
    }
  
    @Post('/login')
    @ApiOperation({ summary: 'Log the user into the platform 🔒' })
    @ApiResponse({ status: 200, description: 'User has successfully logged in ✅' })
    @ApiBody({ type: LoginDto })
    login(@Body() body: LoginDto): Promise<any> {
      return this.authService.login(body);
    }
  }

