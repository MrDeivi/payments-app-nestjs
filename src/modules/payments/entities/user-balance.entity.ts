import { Ref, modelOptions, prop } from '@typegoose/typegoose'
import { User } from 'src/modules/users/entities/user.entity'
import { BaseEntity } from '../../../base/base.model'
import { schemaOptions } from '../../../base/utils'

@modelOptions(schemaOptions('user_balance'))
export class UserBalance extends BaseEntity {
	@prop({ required: true, ref: () => User })
	user: Ref<User>

	@prop({ required: true })
	balance: number

	@prop({ required: true, default: 'USD' })
	currency: string
}
