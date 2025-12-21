import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/services/database.service';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

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

  async create(dto: CreateUserDTO): Promise<User> {
    const result = await this.databaseService.query<User>(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [dto.name, dto.email],
    );

    return result.rows[0];
  }

  async update(dto: UpdateUserDto, id: number): Promise<User | null> {
    const result = await this.databaseService.query<User>(
      'UPDATE users SET name = $2, email = $3 WHERE id = $1 RETURNING *',
      [id, dto.name, dto.email],
    );

    return result.rows[0] ?? null;
  }

  async delete(id: number): Promise<void> {
    await this.databaseService.query('DELETE FROM users WHERE id = $1', [id]);
  }
}
