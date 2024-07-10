import { Injectable } from '@nestjs/common'
import { BaseService } from '../../base/base.service'
import { Role } from './entities/roles.entity'

@Injectable()
export class RolesService extends BaseService<Role>(Role, { softDelete: false }) {}
