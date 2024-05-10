import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { LocalStrategy } from './local.strategy';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
      TypeOrmModule.forFeature([User]),
      PassportModule,
      JwtModule.registerAsync({
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          global: true, 
          signOptions: { expiresIn: '3h' },
          secret: configService.get('JWT_SECRET'), 
        }),
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserService, LocalStrategy, JwtStrategy],
    exports: [AuthService],
  })
  export class AuthModule {}
