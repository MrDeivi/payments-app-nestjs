import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/modules/users/user.module';
import config from 'config/config';
import { RedisModule } from '../redis/redis.module';

@Module({
	imports: [
		RedisModule,
		UsersModule,
		PassportModule,
		JwtModule.register({
			global: true,
			secret: config.JWT_SECRET,
			signOptions: { expiresIn: '60m' },
		}),
	],
	providers: [AuthService, JwtStrategy],
	controllers: [AuthController],
})
export class AuthModule {}
