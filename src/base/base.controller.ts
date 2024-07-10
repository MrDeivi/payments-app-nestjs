import {
	BadRequestException,
	Body,
	Controller,
	Delete,
	Get,
	Inject,
	Logger,
	Param,
	Patch,
	Post,
	Type
} from '@nestjs/common'
import { isObject, validate } from 'class-validator'
import { IBaseService, Pagination } from './interfaces'

type GenericParams<M> = {
	name: string
	serviceClass: Type<IBaseService<M>>
	createDtoClass?: any
	updateDtoClass?: any
}

export function BaseController<M>(args: GenericParams<M>) {
	const { createDtoClass, name, serviceClass, updateDtoClass } = args

	@Controller(name)
	class BaseController {
		@Inject(serviceClass) service: IBaseService<M>

		@Post()
		async [`findAll_${name}`](
			@Body('conditions') conditions: Record<string, any>,
			@Body('pagination') pagination: Pagination,
		) {
			return this.service.findAll(conditions, pagination)
		}

		@Post('/findOne')
		async [`findOne_${name}`](@Body('conditions') conditions) {
			return this.service.findOne(conditions)
		}

		@Post('/exists')
		async [`exists_${name}`](@Body('conditions') conditions) {
			if (!isObject(conditions)) {
				throw new BadRequestException('Invalid conditions')
			}
			const exists = await this.service.exists(conditions)
			return exists
		}

		@Get(':id')
		async [`findById_${name}`](@Param('id') id: string) {
			return this.service.findById(id)
		}

		@Post('/create')
		async [`create_${name}`](@Body() data: any) {
			const instance = new (createDtoClass as any)(data)
			const errors = await validate(instance)

			if (errors.length) {
				throw new BadRequestException(errors)
			}

			return this.service.create(instance)
		}

		@Patch(':id')
		async [`update_${name}`](@Param('id') id: string, @Body() data: any) {
			const instance = new (updateDtoClass as any)(data)
			const errors = await validate(instance)

			if (errors.length) {
				throw new BadRequestException(errors)
			}

			return this.service.update(id, instance)
		}

		@Delete(':id')
		[`remove_${name}`](@Param('id') id: string) {
			return this.service.remove(id)
		}
	}

	return BaseController
}
