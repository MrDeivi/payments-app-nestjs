import { Ref, index, modelOptions, prop } from '@typegoose/typegoose'
import { BaseEntity } from '../../../base/base.model'
import { schemaOptions } from '../../../base/utils'
import { User } from 'src/modules/users/entities/user.entity'

export enum PaymentStatusEnum {
	pending = "pending",
	queued = "queued",
	failed = "failed",
	success = "success",
}

@modelOptions(schemaOptions('payment_requests'))
export class PaymentRequest extends BaseEntity {

	@prop({ required: true, ref: () => User, autopopulate: true })
	user: Ref<User>

	@prop({ required: true })
	paymentMethod: string

	@prop({ required: true, default: PaymentStatusEnum.pending })
	status: PaymentStatusEnum

	@prop({ required: true })
	amount: number

	@prop({ required: true, default: 'USD' })
	currency: string

	@prop({})
	failedReason: string
}
