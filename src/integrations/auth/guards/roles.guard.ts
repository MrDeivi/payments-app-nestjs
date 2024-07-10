import { Injectable, CanActivate, ExecutionContext, applyDecorators, UseGuards, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(context: ExecutionContext): boolean {
		const permission = context.getHandler().name
		const { user } = context.switchToHttp().getRequest();
		Logger.verbose(permission,'Handler Fn')
		return user.roles.some((role) => role.permissions.includes(permission));
	}
}

export function RolesAuth() {
	return applyDecorators(UseGuards(JwtAuthGuard, RolesGuard))
}
