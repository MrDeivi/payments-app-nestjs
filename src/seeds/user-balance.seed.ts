import { BaseSeed } from './base.seed'
import { balances } from './data'

export class UserBalanceSeed extends BaseSeed('user_balance') {
	async seed() {
		const collection = await this.getCollection()
		await collection.deleteMany({})

		for (const balance of balances) {
			await collection.findOneAndUpdate(
				{ user : balance.user, currency: balance.currency },
				{ $set: { ...balance } },
				{ upsert: true }
			)
		}
	}
}
