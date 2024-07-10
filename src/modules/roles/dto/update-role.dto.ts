import { CreateRoleDto } from './create-role.dto'

export class UpdateRoleDto extends CreateRoleDto {
  constructor(data: UpdateRoleDto) {
    super(data)
    this.load(data as CreateRoleDto)
  }
}
