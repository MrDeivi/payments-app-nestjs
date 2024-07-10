import { Test, TestingModule } from '@nestjs/testing'
import { TypegooseModule } from 'nestjs-typegoose'
import { AdminUsersService } from '../user.service'
import { AdminUser } from '../entities/user.entity'
import config from '../../../../config/config'
import { forwardRef } from '@nestjs/common'
import { GlobalAppModule } from '../../../app.global.module'
import { AuthModule } from '../../../integrations/auth/auth.module'
import { EncryptionModule } from '../../../integrations/encryption/encryption.module'
import { JwtModule } from '@nestjs/jwt'

describe('AdminUsersService', () => {
  let service: AdminUsersService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminUsersService],
      imports: [
        forwardRef(() => GlobalAppModule),
        TypegooseModule.forFeature([AdminUser]),
        TypegooseModule.forRoot(config.MONGO_URL),
        EncryptionModule,
        AuthModule,
        JwtModule.register({
          global: true,
          secret: config.JWT_SECRET,
          signOptions: { expiresIn: '1h' },
        }),
      ],
    }).compile()

    service = module.get<AdminUsersService>(AdminUsersService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
