import { IsNumber, IsString } from 'class-validator'

export class CreatePaymentRequestDto {
	@IsString()
	paymentMethod: string
	@IsString()
	currency: string
	@IsNumber()
	amount: number

	constructor(data: CreatePaymentRequestDto) {
		this.load(data)
	}

	load(data: CreatePaymentRequestDto) {
		this.paymentMethod = data?.paymentMethod
		this.currency = data?.currency
		this.amount = data?.amount
	}
}
