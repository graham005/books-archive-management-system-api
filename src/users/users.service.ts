import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Profile } from 'src/profiles/entities/profile.entity';
import { Bookreview } from 'src/bookreviews/entities/bookreview.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>, 
    @InjectRepository(Bookreview) private readonly bookreviewRepository: Repository<Bookreview>
  ) {}
  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.userRepository.findOne({ where: {email: createUserDto.email } });
    if (existingUser) {
      throw new Error(`User with email ${createUserDto.email} already exists`);
    }
    const newUser = await this.userRepository.create({...createUserDto})
    await this.userRepository.save(newUser);

    return newUser;
  }

  findAll() {
    return this.userRepository.find({
      relations: ['profile', 'bookreviews']});
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['profile', 'bookreviews'],
    });
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`User with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error updating user: ${error.message}`);
      })
      .finally(() => {
        return this.findOne(id);
      })
  }

  async remove(id: number) {
    return await this.userRepository.delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`User with ID ${id} not found`);
        }
        return { message: `User with ID ${id} deleted successfully` };
      })
      .catch((error) => {
        throw new Error(`Error deleting user: ${error.message}`);
      });
  }
}
