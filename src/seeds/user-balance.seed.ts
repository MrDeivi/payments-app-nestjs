import { BaseSeed } from './base.seed'
import { balances } from './data'

export class UserBalanceSeed extends BaseSeed('user_balance') {
	async seed() {
		const collection = await this.getCollection()
		await collection.deleteMany({})

		await collection.insertMany(balances)
	}
}
