import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: `Users' email address`,
    example: 'igorveic@gmail.com',
  })
  username: string;

  @IsStrongPassword()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    description: `Users' strong password`,
    example: 'Pa$w0rd123',
  })
  password: string;
}