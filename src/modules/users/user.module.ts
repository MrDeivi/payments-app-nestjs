import { Module, forwardRef } from '@nestjs/common'
import { TypegooseModule } from 'nestjs-typegoose'
import { UsersController } from './user.controller'
import { UsersService } from './user.service'
import { User } from './entities/user.entity'
import { UserBalance } from '../payments/entities/user-balance.entity'
@Module({
	imports: [
		TypegooseModule.forFeature([User]),
		TypegooseModule.forFeature([UserBalance]),
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
