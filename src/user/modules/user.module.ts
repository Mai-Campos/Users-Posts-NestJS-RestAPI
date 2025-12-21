import { Module } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserController } from '../controllers/user.controller';
import { UserRepository } from '../repositories/user.repository';
import { DatabaseModule } from 'src/database/modules/database.module';

@Module({
  providers: [UserService, UserRepository],
  controllers: [UserController],
  imports: [DatabaseModule],
  exports: [UserService],
})
export class UserModule {}
