import { IsArray, IsString } from 'class-validator'

export class CreateRoleDto {
  @IsString()
  name: string

  @IsArray()
  @IsString({ each: true })
  permissions: string[]

  constructor(data: CreateRoleDto) {
    this.load(data)
  }

  load(data: CreateRoleDto) {
    this.name = data?.name
    this.permissions = data?.permissions
  }
}
