import { RedisModule } from '@liaoliaots/nestjs-redis'
import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ThrottlerModule } from '@nestjs/throttler'
import config from 'config/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { APP_PROVIDERS } from './app.providers'
import { AuthModule } from './integrations/auth/auth.module'
import { PaymentRequestsModule } from './modules/payments/payment-request.module'
import { RolesModule } from './modules/roles/roles.module'
import { UsersModule } from './modules/users/user.module'

@Module({
	imports: [
		RedisModule,
		HttpModule,
		AuthModule,
		UsersModule,
		PaymentRequestsModule,
		RolesModule,
		TypegooseModule.forRoot(config.MONGO_URL),
		EventEmitterModule.forRoot(),
		ThrottlerModule.forRoot({
			ttl: 60,
			limit: 60,
		}),
	
	],
	controllers: [],
	providers: [...APP_PROVIDERS],
	exports: [],
})
export class AppModule {}
