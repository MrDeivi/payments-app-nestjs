import { Module } from '@nestjs/common'
import { PaymentRequestsService } from './payment-request.service'
import { PaymentRequest } from './entities/payment-request.entity'
import { TypegooseModule } from 'nestjs-typegoose'
import { UserBalance } from './entities/user-balance.entity'
import { PaymentRequestsController } from './payment-request.controller'
import { BullModule } from '@nestjs/bullmq'
import { PaymentRequestConsumer } from './payment-request.consumer'
import { PaymentsGateway } from './payment-request.gateway'

@Module({
	imports: [
		TypegooseModule.forFeature([PaymentRequest]),
		TypegooseModule.forFeature([UserBalance]),
		BullModule.forRoot({
			connection: {
				username: 'default',
				password: 'KYv5g5y39b8EPuTUn0rr49W08G54Mu6d',
				host: 'redis-11896.c15.us-east-1-2.ec2.redns.redis-cloud.com',
				port: 11896,
			},
		}),
		BullModule.registerQueue({
			name: 'payment_requests_queue',
		}),
	],
	providers: [PaymentRequestsService, PaymentRequestConsumer, PaymentsGateway],
	exports: [PaymentRequestsService],
	controllers: [PaymentRequestsController]
})
export class PaymentRequestsModule {}
