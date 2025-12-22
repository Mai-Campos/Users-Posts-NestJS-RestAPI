import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/services/database.service';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { UserWithPosts } from '../model/user-with-posts';
import { UserWithPostsRow } from './utils/user-with-posts-row';

@Injectable()
export class UserRepository {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAll(): Promise<User[]> {
    const result = await this.databaseService.query<User>(
      'SELECT * FROM users',
    );

    return result.rows;
  }

  async findById(id: number): Promise<User | null> {
    const result = await this.databaseService.query<User>(
      'SELECT * FROM users WHERE id = $1',
      [id],
    );

    return result.rows[0] ?? null;
  }

  async findUserWithPosts(id: number): Promise<UserWithPosts | null> {
    const result = await this.databaseService.query<UserWithPostsRow>(
      'SELECT u.id as author_id, u.name as author_name, u.email as author_email, p.title as post_title, p.content as post_content, p.id as post_id FROM users u LEFT JOIN posts p ON p.user_id = u.id WHERE u.id = $1',
      [id],
    );

    if (result.rows.length === 0) return null;

    const user: UserWithPosts = {
      id: result.rows[0].author_id,
      name: result.rows[0].author_name,
      email: result.rows[0].author_email,
      posts: [],
    };

    for (const row of result.rows) {
      if (row.post_id) {
        user.posts.push({
          id: row.post_id,
          title: row.post_title!,
          content: row.post_content ?? undefined,
        });
      }
    }

    return user;
  }

  async create(dto: CreateUserDTO): Promise<User> {
    const result = await this.databaseService.query<User>(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [dto.name, dto.email],
    );

    return result.rows[0];
  }

  async update(dto: UpdateUserDto, id: number): Promise<User | null> {
    // Array of fields that will be updated
    const fields: string[] = [];

    // Array of values to be updated
    const values: any[] = [];

    // SQL parameter number
    let index = 1;

    // If the name is received
    if (dto.name !== undefined) {
      fields.push(`name = $${index++}`);
      values.push(dto.name);
    }

    // If the email is received
    if (dto.email !== undefined) {
      fields.push(`email = $${index++}`);
      values.push(dto.email);
    }

    // If no fields are received
    if (fields.length === 0) {
      return this.findById(id);
    }

    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = $${index} RETURNING * `;

    values.push(id);

    const result = await this.databaseService.query<User>(query, values);

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<void> {
    await this.databaseService.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
