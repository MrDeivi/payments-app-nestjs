import {
	LogLevels,
	modelOptions,
	plugin,
	prop,
	setLogLevel,
	Severity
} from '@typegoose/typegoose'
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import * as mongooseAutopopulate from 'mongoose-autopopulate'
setLogLevel(LogLevels.WARN)

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BaseEntity extends Base {}

@plugin(mongooseAutopopulate as any)
@modelOptions({
	options: { allowMixed: Severity.ALLOW },
	schemaOptions: { toJSON: { virtuals: true, }, toObject: { virtuals: true } },
})
export abstract class BaseEntity extends TimeStamps {
	@prop({ required: true, default: false })
	public _deleted?: boolean
}
