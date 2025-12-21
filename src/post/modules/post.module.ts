import { Module } from '@nestjs/common';
import { PostService } from '../services/post.service';
import { PostController } from '../controllers/post.controller';
import { DatabaseModule } from 'src/database/modules/database.module';
import { PostsRepository } from '../repositories/post.repository';
import { UserModule } from 'src/user/modules/user.module';

@Module({
  controllers: [PostController],
  imports: [DatabaseModule, UserModule],
  providers: [PostService, PostsRepository],
})
export class PostModule {}
