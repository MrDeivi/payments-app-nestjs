import { Controller } from '@nestjs/common';
import { UsersService } from './user.service';
import { BaseController } from 'src/base/base.controller';

@Controller('users')
export class UsersController extends BaseController({
	name: 'user',
	serviceClass: UsersService,
}) {}
