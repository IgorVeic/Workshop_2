import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserResponseDto } from '../user/dtos/user-response.dto';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    username,
    password,
    role,
  }: RegisterDto): Promise<UserResponseDto> {
    const existingUser = await this.userService.getUserByUsername(username);

    if (existingUser) {
      throw new BadRequestException(
        `User with username ${username} already exists 🚫`,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      username,
      password: hashedPassword,
      role,
    };

    return this.userService.create(user);
  }

  async login({ username, password }: LoginDto): Promise<any> {
    const validUser = await this.validateUser(username, password);

    if (!validUser) {
      throw new BadRequestException('Invalid credentials.');
    }

    const payload = {
      username: validUser.username,
      role: validUser.role,
      sub: validUser.id,
    };

    const accessToken = this.jwtService.sign(payload);

    const { password: _, ...restOfUser } = validUser;

    return {
      user: restOfUser,
      accessToken,
    };
  }

  async validateUser(username: string, password: string) {
    const existingUser =
      await this.userService.getUserByUsernameWithPassword(username);

    if (!existingUser) {
      return null;
    }

    const passwordsAreMatching = await bcrypt.compare(
      password,
      existingUser.password,
    );

    if (!passwordsAreMatching) {
      return null;
    }

    return existingUser;
  }
}

