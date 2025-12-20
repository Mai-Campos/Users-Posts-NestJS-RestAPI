import {
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserRepository } from '../repositories/user.repository';
import { User } from '../model/user.model';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { CreateUserDTO } from '../dtos/create-user.dto';

@Injectable()
export class UserService {
  constructor(private userRepo: UserRepository) {}

  async findAllUsers(): Promise<User[]> {
    const users = await this.userRepo.findAll();

    return users;
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepo.findById(id);

    if (!user) throw new NotFoundException(`User with id: ${id} non exist`);

    return user;
  }

  async createUser(dto: CreateUserDTO): Promise<User> {
    try {
      return await this.userRepo.create(dto);
    } catch (error: any) {
      const pgError = error as { code?: string };
      if (pgError.code === '23505') {
        throw new ConflictException('Email already exist');
      }

      throw new InternalServerErrorException('Failed to create user');
    }
  }

  async updateUser(dto: UpdateUserDto, id: number): Promise<User> {
    try {
      const upadtedUser = await this.userRepo.update(dto, id);

      if (!upadtedUser)
        throw new NotFoundException(`User with id: ${id} not found `);

      return upadtedUser;
    } catch (error: any) {
      if (error instanceof HttpException) {
        throw error;
      }

      const pgError = error as { code?: string };

      if (pgError.code === '23505')
        throw new ConflictException('Email already exist');

      throw new InternalServerErrorException('Failed to update user');
    }
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }
}
