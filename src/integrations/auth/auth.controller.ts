import { Controller, Request, Post, UseGuards, Body, Get, Headers, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LoginDto, RegisterUserDto } from './dto/login.dto';
import { GetUser } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	async login(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}
	@Post('refreshSession')
	async refreshSession(@Headers() headers) {
		return this.authService.refresh(headers.refresh_token);
	}
	@UseGuards(JwtAuthGuard)
	@Post('logout')
	async logout(@Headers() headers) {
		return this.authService.logout(headers.authorization ?? headers.Authorization);
	}

	@Post('register')
	async register(@Body() dto: RegisterUserDto) {
		return this.authService.register(dto);
	}

	@UseGuards(JwtAuthGuard)
	@Get('me')
	getProfile(@GetUser() user) {
		return user;
	}
}
