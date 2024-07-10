import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common'
import { Observable } from 'rxjs'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp()
    const req = ctx.getRequest()
    const user = req.user
    const ip = req?.ip
    const handler = context.getHandler().name

    const origin = req?.headers?.origin || req?.headers?.['user-agent']

    let aux = ''

    if (user) {
      const { id, name } = user
      aux = `
          User Name: ${name}
          User Id: ${id}`
    }

    Logger.debug(
      `${aux} 
          IP: ${ip}
	  Handler: ${handler}
          Origin: ${origin}`,
      context.getClass().name,
    )

    return next.handle()
  }
}
