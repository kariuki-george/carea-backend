import { Injectable } from '@nestjs/common';

import { CreateCarInput } from './dto/createCar.dto';
import { CreateCategoryInput } from './dto/createCategory.dto';
import { CreateReviewInput } from './dto/createReview.dto';
import { GetCarsInput } from './dto/getCars.dto';
import { UpdateCarInput } from './dto/updateCar.dto';
import { Category } from './entities/category.entity';
import { Review } from './entities/review.entity';
import { CarResponse } from './res/createCar.res';
import { CategoryResponse } from './res/createCategory.res';
import { GetCarsResponse } from './res/getCars.res';

import { Car } from './entities/car.entity';
import { PrismaService } from 'libs/database/prisma.service';

@Injectable()
export class CareaService {
  constructor(private readonly prismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  async createCategory(
    input: CreateCategoryInput
  ): Promise<typeof CategoryResponse> {
    //validate the category uniqueness

    const category = await this.prismaService.category.findUnique({
      where: { name: input.name },
    });
    if (category) {
      return {
        error: true,
        message: 'A category with the provided name already exists',
      };
    }
    const newCategory = await this.prismaService.category.create({
      data: input,
    });

    return {
      category: newCategory,
    };
  }

  async createCar(input: CreateCarInput): Promise<typeof CarResponse> {
    /**
     *
     * Validate whether such a car exists
     */
    const existingCar = await this.prismaService.car.findUnique({
      where: { name: input.name },
    });
    if (existingCar) {
      return {
        error: true,
        message: 'Car with that name already exists',
      };
    }

    const car = await this.prismaService.car.create({
      data: { ...input, name: input.name.toLowerCase() },
    });

    return {
      car,
    };
  }

  async updateCar(input: UpdateCarInput): Promise<typeof CarResponse> {
    const { categoryId, ...data } = input;
    try {
      const car = await this.prismaService.car.update({
        where: { id: input.carId },
        data,
      });
      return {
        car,
      };
    } catch (error) {
      return { error: true, message: error.message || error.response.message };
    }
  }

  async getCars(input: GetCarsInput): Promise<GetCarsResponse> {
    let results: Car[];
    let nextPage: string | false;
    const {
      startIndex,
      limit,
      categoryName,

      name,
    } = input;

    if (startIndex) {
      results = await this.prismaService.car.findMany({
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
    } else {
      results = await this.prismaService.car.findMany({
        take: limit + 1,
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

    //Check if a nextpage exists
    if (results.length > limit) {
      nextPage = results[limit].id;
    } else {
      nextPage = false;
    }

    return {
      nextPage,
      cars: results.slice(0, limit),
    };
  }

  getCarCategories(): Promise<Category[]> {
    return this.prismaService.category.findMany();
  }

  createReviewOrRating(input: CreateReviewInput): Promise<Review> {
    const { id, ...data } = input;
    //check if a rating or review with the userId exists
    return this.prismaService.review.upsert({
      where: { id: input.id },
      create: data,
      update: data,
    });
  }
  getCarById(carId: string): Promise<Car> {
    return this.prismaService.car.findUnique({ where: { id: carId } });
  }
}
