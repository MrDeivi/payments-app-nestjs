import { DocumentType, ReturnModelType } from '@typegoose/typegoose'

export interface IBaseService<M> {
  model: ReturnModelType<any>
  create(createDto: any): Promise<DocumentType<M>>
  createIfUnique(conditions, dto): Promise<DocumentType<M>>
  findAll(
    conditions: object,
    pagination: Pagination,
  ): Promise<{ elements: DocumentType<M>[]; pagination: PaginationResult }>
  findById(id: string): Promise<DocumentType<M>>
  findOne(conditions: object): Promise<DocumentType<M>>
  update(id: string, updateDto: any): Promise<DocumentType<M>>
  exists(conditions: object): Promise<boolean>
  remove(id: string): Promise<DocumentType<M>>
  count(conditions?: object): Promise<number>
}

export interface Pagination {
  page?: number
  limit?: number
}

export interface PaginationResult {
  totalElements: number
  hasNextPage: boolean
  nextPage: number
  previousPage: number
  lastPage: number
}

export const DEFAULT_PAGINATION = { page: 1, limit: 10 }
