import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private service: UserService) {}

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.service.findAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return await this.service.findUserById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async postUser(@Body() dto: CreateUserDTO): Promise<User> {
    return await this.service.createUser(dto);
  }

  @Put(':id')
  async putUser(
    @Body() dto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<User> {
    return await this.service.updateUser(dto, id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.service.deleteUser(id);
  }
}
