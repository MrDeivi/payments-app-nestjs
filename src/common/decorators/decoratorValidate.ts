import { registerDecorator, ValidationOptions } from 'class-validator'

export function decoratorValidate(validationOptions: ValidationOptions, validator: any) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator,
    })
  }
}
