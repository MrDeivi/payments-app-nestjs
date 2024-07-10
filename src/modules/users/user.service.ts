import {
	Injectable
} from '@nestjs/common'
import { DocumentType, ReturnModelType } from '@typegoose/typegoose'
import { InjectModel } from 'nestjs-typegoose'
import { BaseService } from '../../base/base.service'
import { UserBalance } from '../payments/entities/user-balance.entity'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService extends BaseService<User>(User) {
	@InjectModel(UserBalance) private userBalanceModel: ReturnModelType<typeof UserBalance>

	async createUser(createDto: any): Promise<DocumentType<User>> {
		const res = await this.create(createDto)

		// Create some fake balance to allow make payments
		await this.userBalanceModel.create([
			{ balance: 2000, currency: 'USD', user: res._id },
			{ balance: 2000, currency: 'EUR', user: res._id },
		])

		return await this.findById(res.id)
	}
}
