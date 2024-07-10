import { Test, TestingModule } from '@nestjs/testing'
import config from '../../../../config/config'
import { TypegooseModule } from 'nestjs-typegoose'
import { AdminUsersController } from '../user.controller'
import { AdminUsersService } from '../user.service'
import { AdminUser } from '../entities/user.entity'
import { forwardRef } from '@nestjs/common'
import { GlobalAppModule } from '../../../app.global.module'
import { EncryptionModule } from '../../../integrations/encryption/encryption.module'
import { AuthModule } from '../../../integrations/auth/auth.module'
import { JwtModule } from '@nestjs/jwt'

describe('AdminUsersController', () => {
  let controller: AdminUsersController
  let adminUsersService: AdminUsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUsersController],
      providers: [AdminUsersService],
      imports: [
        EncryptionModule,
        AuthModule,
        JwtModule.register({
          global: true,
          secret: config.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
        forwardRef(() => GlobalAppModule),
        TypegooseModule.forFeature([AdminUser]),
        TypegooseModule.forRoot(config.MONGO_URL),
      ],
    }).compile()

    adminUsersService = module.get<AdminUsersService>(AdminUsersService)
    controller = module.get<AdminUsersController>(AdminUsersController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
