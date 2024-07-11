import { BaseSeed } from './base.seed'
import { roles } from './data'

export class RolesSeed extends BaseSeed('roles') {
	async seed() {
		const collection = await this.getCollection()
		await collection.deleteMany({})

		await collection.insertMany(roles)
	}
}
