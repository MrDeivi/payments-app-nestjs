import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Inject, Logger } from '@nestjs/common';
import { Job } from 'bullmq';
import { InjectModel } from 'nestjs-typegoose';
import { delay } from 'src/common/utils/delay';
import { UserBalance } from './entities/user-balance.entity';
import { ReturnModelType } from '@typegoose/typegoose';
import { PaymentRequest, PaymentStatusEnum } from './entities/payment-request.entity';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Processor('payment_requests_queue')
export class PaymentRequestConsumer extends WorkerHost {
	@Inject(EventEmitter2) private eventEmitter: EventEmitter2
	@InjectModel(UserBalance) private userBalanceModel: ReturnModelType<typeof UserBalance>
	@InjectModel(PaymentRequest) private paymentRequestModel: ReturnModelType<typeof PaymentRequest>

	async process(job: Job<any, any, string>): Promise<any> {
		Logger.verbose('Processing payment...')

		const { user, paymentRequest } = job.data
		const { currency, amount, id } = paymentRequest

		await this.updatePaymentStatus(id, PaymentStatusEnum.queued)

		// delay to simulate real processing time
		await delay(10000)

		const userBalance = await this.userBalanceModel.findOne({ user: user.id, currency })

		if (userBalance.balance >= amount) {

			userBalance.balance -= amount
			await userBalance.save()
			await this.updatePaymentStatus(id, PaymentStatusEnum.success)
			await job.moveToCompleted(`Finished processing of payment ${job.data.id}`, '')
		} else {
			await this.updatePaymentStatus(id, PaymentStatusEnum.failed)
			job.moveToFailed({ message: `Insufient founds for the currency: ${currency}`, name: '' }, '')
		}

		// Finish the job
		Logger.verbose(`Finished processing of payment: ${job.data.id}`)
		return {};
	}

	async updatePaymentStatus(id: string, status: PaymentStatusEnum) {
		const doc = await this.paymentRequestModel.findById(id)
		doc.status = status
		await doc.save()
		this.eventEmitter.emit('updatedPayment', { paymentRequest: doc.toJSON() })
	}
}
