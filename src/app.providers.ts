import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core'
import { ThrottlerGuard } from '@nestjs/throttler'
import { LoggingInterceptor } from './common/interceptors/logging.interceptor'

export const APP_PROVIDERS = [
  {
    provide: APP_INTERCEPTOR,
    useClass: LoggingInterceptor,
  },
  {
    provide: APP_GUARD,
    useClass: ThrottlerGuard,
  },
]
