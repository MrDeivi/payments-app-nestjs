import { createParamDecorator } from '@nestjs/common'

/**
 *   Get the user from context in REST controllers
 **/
export const GetUser = createParamDecorator((data, ctx) => {
  const context = ctx.switchToHttp()
  const request = context.getRequest()
  return request.user
})
