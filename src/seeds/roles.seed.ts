import { BaseSeed } from './base.seed'
import { roles } from './data'

export class RolesSeed extends BaseSeed('roles') {
	async seed() {
		const collection = await this.getCollection()
		await collection.deleteMany({})

		for (const role of roles) {
			await collection.findOneAndUpdate(
				{ name: role.name },
				{ $set: { ...role } },
				{ upsert: true, }
			)
		}
	}
}
