import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Inject,
  CACHE_MANAGER,
} from '@nestjs/common';
import { CreateCarInput } from './dto/createCar.dto';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/category.dto';
import { GetCarsInput } from './dto/getCars.dto';
import { UpdateCarInput } from './dto/updateCar.dto';
import { Category } from './entities/category.entity';
import { GetCarsResponse } from './res/getCars.res';
import { Cache } from 'cache-manager';
import { Car } from './entities/car.entity';
import { PrismaService } from 'src/providers/database/prisma.service';

@Injectable()
export class InventoryService {
  constructor(
    private readonly prismaService: PrismaService,
    @Inject(CACHE_MANAGER) private cacheService: Cache
  ) {}

  async createCategory(input: CreateCategoryInput): Promise<Category> {
    //validate the category uniqueness

    try {
      const category = await this.prismaService.categories.create({
        data: input,
      });
      await this.cacheService.del('categories');

      return category;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException(
          'A category with the provided name already exists'
        );
      }
    }
  }

  async updateCategory(input: UpdateCategoryInput): Promise<Category> {
    //validate the category uniqueness

    const { categoryId, ...data } = input;

    const category = await this.prismaService.categories.update({
      where: { id: categoryId },
      data,
    });
    // Invalidate cache
    await this.cacheService.del('categories');

    return category;
  }

  async deleteCategory(categoryId: number): Promise<boolean> {
    //validate the category uniqueness

    await this.prismaService.categories.delete({
      where: { id: categoryId },
    });
    // Invalidate cache
    await this.cacheService.del('categories');

    return true;
  }

  async getCarCategories(): Promise<Category[]> {
    const cache: Category[] = await this.cacheService.get('categories');

    if (cache) {
      return cache;
    }

    const categories = await this.prismaService.categories.findMany();

    await this.cacheService.set('categories', categories);
    return categories;
  }

  async createCar(input: CreateCarInput): Promise<Car> {
    /**
     *
     * Validate whether such a car exists
     */

    try {
      const car = await this.prismaService.cars.create({
        data: { ...input, name: input.name.toLowerCase() },
      });

      await this.cacheService.set('cars-' + car.id, car);

      return car;
    } catch (error) {
      if (error.code === 'P2002') {
        throw new BadRequestException('Car with that name already exists');
      }
      {
      }
    }
  }

  async updateCar(input: UpdateCarInput): Promise<Car> {
    const { carId, ...data } = input;
    const car = await this.prismaService.cars.update({
      where: { id: carId },
      data,
    });
    await this.cacheService.set('cars-' + car.id, car);

    return car;
  }

  // Note: Pages from 0 upwards.
  // Shows old cars first to new ones
  async getCars(input: GetCarsInput): Promise<GetCarsResponse> {
    let nextPage: number;
    const { startIndex, limit, categoryName, name } = input;

    let results: Car[];
    results = await this.cacheService.get(
      'cars-' + startIndex.toString() + '-' + limit.toString()
    );

    if (!results || results.length === 0) {
      results = await this.prismaService.cars.findMany({
        take: limit + 1,
        cursor: {
          id: startIndex,
        },

        where: {
          OR: {
            name: {
              contains: name || '',
            },
            category: {
              name: {
                contains: categoryName || '',
              },
            },
          },
        },
      });
    }

    await this.cacheService.set(
      'cars-' + startIndex.toString() + '-' + limit.toString(),
      results
    );

    //Check if a nextpage exists
    if (results.length > limit) {
      nextPage = results[limit].id;
    } else {
      nextPage = 0;
    }

    return {
      nextPage,
      cars: results.slice(0, limit),
    };
  }

  async getCarById(carId: number): Promise<Car> {
    const cache: Car = await this.cacheService.get('cars-' + carId);
    if (cache) {
      return cache;
    }

    const car = await this.prismaService.cars.findUnique({
      where: { id: carId },
    });

    if (car) {
      await this.cacheService.set('cars-' + carId, car);
      return car;
    }

    throw new NotFoundException('Car not found');
  }
}
