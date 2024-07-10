import { Logger } from '@nestjs/common'
import { RolesSeed } from './roles.seed'
import { UsersSeed } from './users.seed'
import { UserBalanceSeed } from './user-balance.seed'

export const seed = async () => {
	const rolesSeed = new RolesSeed()
	await rolesSeed.seed()

	const usersSeed = new UsersSeed()
	await usersSeed.seed()

	const userBalanceSeed = new UserBalanceSeed()
	await userBalanceSeed.seed()

	Logger.log('Seed success. Database filled')
	process.exit()
}

seed()
