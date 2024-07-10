import { Module } from '@nestjs/common'
import { RolesService } from './roles.service'
import { Role } from './entities/roles.entity'
import { TypegooseModule } from 'nestjs-typegoose'

@Module({
  imports: [TypegooseModule.forFeature([Role])],
  providers: [RolesService],
  exports: [RolesService],
})
export class RolesModule {}
