import { modelOptions, prop, Ref } from '@typegoose/typegoose'
import { BaseEntity } from '../../../base/base.model'
import { schemaOptions } from '../../../base/utils'
import { Role } from '../../roles/entities/roles.entity'
import { UserBalance } from 'src/modules/payments/entities/user-balance.entity'

@modelOptions(schemaOptions('users'))
export class User extends BaseEntity {
	@prop({ required: true })
	name: string

	@prop({ required: true })
	email: string

	@prop({ required: true, select: false })
	passwordHash: string

	@prop({ ref: () => Role, required: true, autopopulate: true })
	roles: Ref<Role>[]

	@prop({
		ref: () => UserBalance,
		autopopulate: true,
		foreignField: 'user',
		localField: '_id',
	})
	balance: Ref<UserBalance>[]
}
