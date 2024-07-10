import { InjectQueue } from '@nestjs/bullmq';
import { BadRequestException, Injectable, OnModuleInit } from '@nestjs/common';
import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { Queue } from 'bullmq';
import { InjectModel } from 'nestjs-typegoose';
import { BaseService } from '../../base/base.service';
import { CreatePaymentRequestDto } from './dto/create-payment-request.dto';
import { PaymentRequest } from './entities/payment-request.entity';
import { UserBalance } from './entities/user-balance.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PaymentRequestsService extends BaseService<PaymentRequest>(PaymentRequest, { softDelete: true }) {
	constructor(
		@InjectModel(UserBalance) public userBalanceModel: ReturnModelType<typeof UserBalance>,
		@InjectQueue('payment_requests_queue') private queue: Queue
	) {
		super()
	}

	async createAndQueue(createDto: CreatePaymentRequestDto, user: DocumentType<User>): Promise<DocumentType<PaymentRequest>> {
		const { amount, currency } = createDto

		const userBalance = await this.userBalanceModel.findOne({ user: user.id, currency })

		if (!userBalance) throw new BadRequestException(`Your doesn\`t have any balance for the currency: ${currency}`)
		else if (userBalance.balance < amount) throw new BadRequestException(`Insufient founds for the currency: ${currency}`)

		const doc = await this.create({ ...createDto, user: user.id })

		await this.queue.add('process_payment', {
			user,
			paymentRequest: doc.toJSON(),
		}, { delay: 3000 });

		return doc
	}

}
