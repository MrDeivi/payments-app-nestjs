import { index, modelOptions, prop } from '@typegoose/typegoose'
import { BaseEntity } from '../../../base/base.model'
import { schemaOptions } from '../../../base/utils'

@modelOptions(schemaOptions('roles'))
@index({ name: 1 }, { unique: true })
export class Role extends BaseEntity {
  @prop({ required: true })
  name: string

  @prop({ required: true, type: [String] })
  permissions: string[]
}
