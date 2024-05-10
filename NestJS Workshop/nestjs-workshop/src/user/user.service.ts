import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserResponseDto } from './dtos/user-response.dto';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dtos/register.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
      ) {}
    
      async getUserByUsernameWithPassword(username: string): Promise<User> {
        return this.userRepository.findOneBy({
          username,
        });
      }
    
      async getUserByUsername(username: string): Promise<UserResponseDto> {
        return this.userRepository.findOneBy({
          username,
        });
      }
    
      async create(credentials: RegisterDto): Promise<UserResponseDto> {
        const user = this.userRepository.create(credentials);
        await this.userRepository.save(user);
        return {
          username: user.username,
          role: user.role,
        };
      }
}
