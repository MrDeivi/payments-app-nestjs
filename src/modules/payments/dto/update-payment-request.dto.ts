import { IsString } from 'class-validator'

export class UpdatePaymentRequestDto {
	@IsString()
	status: string

	constructor(data: UpdatePaymentRequestDto) {
		this.status = data.status
	}
}
