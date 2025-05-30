import { Injectable } from '@nestjs/common';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}
  create(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto)
    return this.categoryRepository.save(newCategory)
      .then((category) => {
        return category;
      })
      .catch((error) => {
        throw new Error(`Error creating category: ${error.message}`);
      });
  }

  findAll() {
    return this.categoryRepository.find({
      relations: ['user'], });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['user'],
    }).then((category) => {
      if (!category) {
        throw new Error(`Category with ID ${id} not found`);
      }
      return category;
    }).catch((error) => {
      throw new Error(`Error finding category: ${error.message}`);
    });
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Category with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error updating category: ${error.message}`);
      })
      .finally(() => {
        return this.findOne(id);
      });
  }

  remove(id: number) {
    return this.categoryRepository.delete(id)
      .then((result) => {
        if (result.affected === 0) {
          throw new Error(`Category with ID ${id} not found`);
        }
      })
      .catch((error) => {
        throw new Error(`Error deleting category: ${error.message}`);
      });
  }

  async findBooksByCategory(categoryId: number) {
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
      relations: ['books'],
    });

    if (!category) {
      throw new Error(`Category with ID ${categoryId} not found`);
    }

    return category.books;
  }
}
