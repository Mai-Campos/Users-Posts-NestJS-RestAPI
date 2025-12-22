import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/services/database.service';
import { Post } from '../model/post.model';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post.dto';

@Injectable()
export class PostsRepository {
  constructor(private databaseService: DatabaseService) {}

  async findAll(): Promise<Post[]> {
    const result = await this.databaseService.query<Post>(
      'SELECT * from posts',
    );

    return result.rows;
  }

  async findById(id: number): Promise<Post | null> {
    const result = await this.databaseService.query<Post>(
      'Select * from posts Where id = $1',
      [id],
    );

    return result.rows[0] ?? null;
  }

  async create(dto: CreatePostDto): Promise<Post> {
    const result = await this.databaseService.query<Post>(
      'INSERT INTO posts (title, content, user_id) VALUES ($1, $2, $3) RETURNING * ',
      [dto.title, dto.content, dto.user_id],
    );

    return result.rows[0];
  }

  async update(dto: UpdatePostDto, id: number): Promise<Post | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let index = 1;

    if (dto.title !== undefined) {
      fields.push(`title = $${index++}`);
      values.push(dto.title);
    }

    if (dto.content !== undefined) {
      fields.push(`content = $${index++}`);
      values.push(dto.content);
    }

    if (fields.length === 0) {
      return this.findById(id);
    }

    const query = `UPDATE posts SET ${fields.join(', ')} WHERE id = $${index} RETURNING * `;

    values.push(id);

    const result = await this.databaseService.query<Post>(query, values);

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<void> {
    await this.databaseService.query<Post>('DELETE FROM posts WHERE id = $1', [
      id,
    ]);
  }
}
