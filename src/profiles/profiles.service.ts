import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Profile } from './entities/profile.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private readonly profileRepository: Repository<Profile>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  create(createProfileDto: CreateProfileDto) {
    const newProfile = this.profileRepository.create(createProfileDto);
    return this.profileRepository.save(newProfile)
      .then((profile) => {
        return profile;
      })
      .catch((error) => {
        throw new Error(`Error creating profile: ${error.message}`);
      });
  }

  findAll() {
    return this.profileRepository.find({
      relations: ['user'],});
  }

  findOne(id: number) {
    return this.profileRepository.findOne({
      where: { id },
      relations: ['user'],
    }).then((profile) => {
      if (!profile) {
        throw new Error(`Profile with ID ${id} not found`);
      }
      return profile;
    }).catch((error) => {
      throw new Error(`Error finding profile: ${error.message}`);
    })
  }

  update(id: number, updateProfileDto: UpdateProfileDto) {
    return this.profileRepository.update(id, updateProfileDto)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Profile with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error updating profile: ${error.message}`);
      })
      .finally(() => {
        return this.findOne(id); 
      });
  }

  remove(id: number) {
    return this.profileRepository.delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Profile with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error deleting profile: ${error.message}`);
      })
      .finally(() => {
        return { message: `Profile with ID ${id} deleted successfully` };
      });
  }
}
