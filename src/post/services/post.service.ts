import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';
import { PostsRepository } from '../repositories/post.repository';
import { Post } from '../model/post.model';
import { UserService } from 'src/user/services/user.service';

@Injectable()
export class PostService {
  constructor(
    private postRepo: PostsRepository,
    private userService: UserService,
  ) {}

  findAllPosts(): Promise<Post[]> {
    return this.postRepo.findAll();
  }

  async findPostById(id: number): Promise<Post> {
    const post = await this.postRepo.findById(id);

    if (!post) throw new NotFoundException();

    return post;
  }

  async createPost(dto: CreatePostDto): Promise<Post> {
    await this.userService.findUserById(dto.user_id);

    return await this.postRepo.create(dto);
  }

  async updatePost(id: number, dto: UpdatePostDto): Promise<Post> {
    const updatedPost = await this.postRepo.update(dto, id);

    if (!updatedPost)
      throw new NotFoundException(`Post with id: ${id} not found`);

    return updatedPost;
  }

  async deletePost(id: number): Promise<void> {
    const post = await this.postRepo.findById(id);

    if (!post) throw new NotFoundException(`Post with id: ${id} not found`);

    await this.postRepo.delete(id);
  }
}
