import { Body, Controller, Get, Post } from '@nestjs/common';
import { BaseController } from 'src/base/base.controller';
import { RolesAuth } from 'src/integrations/auth/guards/roles.guard';
import { CreatePaymentRequestDto } from './dto/create-payment-request.dto';
import { UpdatePaymentRequestDto } from './dto/update-payment-request.dto';
import { PaymentRequestsService } from './payment-request.service';
import { GetUser } from 'src/common/decorators/user.decorator';
import { Pagination } from 'src/base/interfaces';

@Controller('payment_request')
@RolesAuth()
export class PaymentRequestsController extends BaseController({
	name: 'payment_request',
	serviceClass: PaymentRequestsService,
	createDtoClass: CreatePaymentRequestDto,
	updateDtoClass: UpdatePaymentRequestDto,
}) {

	@Post('/create')
	async create_payment_request(@Body() data: CreatePaymentRequestDto, @GetUser() user) {
		return (this.service as PaymentRequestsService).createAndQueue(data, user)
	}

	@Post('/user')
	async get_user_payments(@GetUser() user,
		@Body('conditions') conditions: Record<string, any>,
		@Body('pagination') pagination: Pagination
	) {
		return this.service.findAll({ ...conditions, user: user.id }, pagination)
	}
}
