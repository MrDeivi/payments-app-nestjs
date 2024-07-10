import { Global, Module } from '@nestjs/common'
import { RedisService } from './redis.service'
import { HttpModule } from '@nestjs/axios'

@Global()
@Module({
	imports: [
		HttpModule
	],
	providers: [RedisService ],
	exports: [RedisService ],
})
export class RedisModule {}
