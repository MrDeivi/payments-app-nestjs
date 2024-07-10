import { SchemaOptions } from '@nestjs/mongoose'
import { Severity } from '@typegoose/typegoose'
import { ICustomOptions } from '@typegoose/typegoose/lib/types'

export function schemaOptions(collection: string): {
  schemaOptions: SchemaOptions
  options: ICustomOptions
} {
  return {
    schemaOptions: {
      timestamps: true,
      collection,
      id: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
    },
    options: {
      allowMixed: Severity.ALLOW,
    },
  }
}

export function merge(obj1, obj2) {
  return { ...obj1, ...obj2 }
}
