import { Injectable, Type, BadRequestException, Logger } from '@nestjs/common'
import { DocumentType } from '@typegoose/typegoose'
import { ReturnModelType } from '@typegoose/typegoose/lib/types'
import { InjectModel } from 'nestjs-typegoose'
import { IBaseService, Pagination, DEFAULT_PAGINATION } from './interfaces'
import { merge } from './utils'

type BaseServiceOptions = {
	softDelete?: boolean
}

export function BaseService<M>(
	modelClass,
	options: BaseServiceOptions = {},
): Type<IBaseService<M>> {
	const { softDelete = true } = options

	@Injectable()
	class BaseService {
		@InjectModel(modelClass) public model: ReturnModelType<any>

		public async create(createDto: any) {
			return this.model.create(createDto) as any as DocumentType<M>
		}

		public async createIfUnique(conditions, dto) {
			const exists = await this.exists(conditions)

			if (exists) {
				throw new BadRequestException('Invalid input')
			}

			return this.model.create(dto) as any as DocumentType<M>
		}

		public async findAll(
			conditions = {},
			pagination: Pagination = DEFAULT_PAGINATION,
		) {
			const where = merge({ _deleted: false }, conditions)
			let { page = 1, limit = 10 } = pagination
			page = Number(page)
			limit = Number(limit)

			if (limit && limit > 100) {
				limit = 100
			}
			const skipCount = (page - 1) * limit
			const query = this.model.find(where)
			query.skip(skipCount).limit(limit).sort('-createdAt')
			const total = await this.model.countDocuments(where as any)

			const paginationResult = {
				totalElements: total,
				hasNextPage: limit * page < total,
				nextPage: page + 1,
				previousPage: page - 1,
				lastPage: Math.ceil(total / limit),
			}

			return {
				elements: await query,
				pagination: paginationResult,
			}
			// as any as DocumentType<M>[]
		}

		public async findById(id: string) {
			return this.model.findById(id) as any as DocumentType<M>
		}

		public async findOne(conditions: object) {
			const where = merge({ _deleted: false }, conditions)
			return this.model.findOne(where) as any as DocumentType<M>
		}

		public async exists(conditions: object) {
			const where = merge({ _deleted: false }, conditions)
			const exists = await this.model.exists(where)
			return exists ? true : false
		}

		public async update(id: string, updateDto: any) {
			const result = (await this.model.findOneAndUpdate(
				{ _id: id },
				updateDto,
				{
					new: true,
				},
			)) as any as DocumentType<M>

			return result
		}

		public async remove(id: string) {
			if (softDelete) {
				return await this.update(id, { _deleted: true })
			} else {
				return await this.model.findByIdAndRemove(id)
			}
		}

		public async count(conditions: object = {}) {
			const where = merge({ _deleted: false }, conditions)
			return this.model.countDocuments(where) as any as number
		}
	}

	return BaseService
}
