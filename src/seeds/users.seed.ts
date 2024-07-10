import { BaseSeed } from './base.seed'
import { users } from './data'

export class UsersSeed extends BaseSeed('users') {
	async seed() {
		const collection = await this.getCollection()
		await collection.deleteMany({})

		for (const user of users) {
			await collection.findOneAndUpdate(
				{ email: user.email },
				{ $set: { ...user } },
				{ upsert: true }
			)
		}
  }
}
