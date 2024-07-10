import { BadRequestException, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UsersService } from 'src/modules/users/user.service';
import { LoginDto, RegisterUserDto } from './dto/login.dto';
import { RedisService } from '../redis/redis.service';
import { REDIS_CONSTANTS } from '../redis/constants';

@Injectable()
export class AuthService {
	private invalidatedTokens = new Map<string, true>

	constructor(
		private readonly usersService: UsersService,
		private readonly jwtService: JwtService,
		public readonly redisService: RedisService
	) {
	}

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.model.findOne({ email }).select('+passwordHash')
		if (user && await bcrypt.compare(pass, user.passwordHash)) {
			const { passwordHash, ...result } = user.toJSON();
			return result;
		}
		return null;
	}

	async login(user: LoginDto) {
		const res = await this.validateUser(user.email, user.password)
		if (!res) throw new BadRequestException('Invalid credentials')

		const accessToken = this.jwtService.sign({ sub: res._id, ...res })
		const refreshToken = this.jwtService.sign({ sub: res._id }, { expiresIn: '7d' });

		return {
			accessToken, refreshToken
		};
	}

	async register(dto: RegisterUserDto) {
		const exists = await this.usersService.exists({ email: dto.email })
		if (exists) throw new BadRequestException('That email is already registered')

		const passwordHash = await bcrypt.hash(dto.password, 10);

		const user = await this.usersService.createUser({ ...dto, passwordHash, roles: ['668c92824249a7de2b7e7507'] });
		const userJson = user.toJSON()
		delete userJson.passwordHash
		return userJson
	}

	async refresh(refreshToken: string) {
		try {
			if (!refreshToken) throw new BadRequestException('Invalid refresh token');

			const payload = this.jwtService.verify(refreshToken);
			const user = await this.usersService.findById(payload.sub);

			if (!user || await this.isInvalidRefreshToken(refreshToken)) {
				throw new BadRequestException('Invalid refresh token');
			}

			const newAccessToken = this.jwtService.sign({ sub: user._id, ...user.toJSON() })
			const newRefreshToken = this.jwtService.sign({ sub: user._id }, { expiresIn: '7d' });

			await this.invalidateRefreshToken(refreshToken)

			return { accessToken: newAccessToken, refreshToken: newRefreshToken };
		} catch (e) {
			throw new BadRequestException('Invalid refresh token');
		}
	}

	async logout(token: string) {
		await this.invalidateRefreshToken(token);
		return { message: "User has been logged out" }
	}

	async isInvalidRefreshToken(token: string) {
		let res = await this.redisService.getObject(REDIS_CONSTANTS.INVALIDATED_PASSWORDS)

		if (!res) return false
		return res[token] === true
	}

	async invalidateRefreshToken(token) {
		let res = await this.redisService.getObject(REDIS_CONSTANTS.INVALIDATED_PASSWORDS)
		if (!res) res = {}
		if (res[token] == true) throw new BadRequestException('Token already invalidated')

		res[token] = true
		await this.redisService.setObject(REDIS_CONSTANTS.INVALIDATED_PASSWORDS, res)
	}
}
