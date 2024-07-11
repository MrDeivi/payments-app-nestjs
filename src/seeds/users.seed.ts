import { BaseSeed } from './base.seed'
import { users } from './data'

export class UsersSeed extends BaseSeed('users') {
	async seed() {
		const collection = await this.getCollection()
		await collection.deleteMany({})

		collection.insertMany(users)
  }
}
