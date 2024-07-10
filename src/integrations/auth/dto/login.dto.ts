import { IsEmail, IsOptional, IsString, Length, MinLength } from 'class-validator'

export class LoginDto {
	@IsEmail()
	email: string

	@IsString()
	password: string
}

export class RegisterUserDto {
	@IsEmail()
	email: string

	@IsString()
	@MinLength(8)
	password: string

	@IsString()
	@MinLength(2)
	name: string
}
