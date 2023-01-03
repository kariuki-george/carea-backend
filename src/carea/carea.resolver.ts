import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { CareaService } from './carea.service';
import { CreateCarInput } from './dto/createCar.dto';
import { CreateCategoryInput } from './dto/createCategory.dto';
import { CreateReviewInput } from './dto/createReview.dto';
import { GetCarsInput } from './dto/getCars.dto';
import { UpdateCarInput } from './dto/updateCar.dto';
import { Car } from './entities/car.entity';
import { Category } from './entities/category.entity';
import { Review } from './entities/review.entity';
import { CarResponse } from './res/createCar.res';
import { CategoryResponse } from './res/createCategory.res';
import { GetCarsResponse } from './res/getCars.res';

@Resolver('Carea')
export class CareaResolver {
  constructor(private readonly careaService: CareaService) {}

  @Query(() => GetCarsResponse)
  getCars(
    @Args('getCarsInput') getCarsInput: GetCarsInput
  ): Promise<GetCarsResponse> {
    return this.careaService.getCars(getCarsInput);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Mutation(() => CategoryResponse)
  createCategory(
    @Args('createCategory') createCategory: CreateCategoryInput
  ): Promise<typeof CategoryResponse> {
    return this.careaService.createCategory(createCategory);
  }

  @Query(() => [Category])
  getCarCategories(): Promise<Category[]> {
    return this.careaService.getCarCategories();
  }

  @UseGuards(JwtAuthGuard,AdminGuard)
  @Mutation(() => CarResponse)
  createCar(
    @Args('createCar') createCar: CreateCarInput
  ): Promise<typeof CarResponse> {
    return this.careaService.createCar(createCar);
  }

  @Mutation(() => Review)
  createReviewOrRating(
    @Args('createReviewOrRating') input: CreateReviewInput
  ): Promise<Review> {
    return this.careaService.createReviewOrRating(input);
  }

  @Mutation(() => CarResponse)
  updateCar(
    @Args('updateCar') updateCar: UpdateCarInput
  ): Promise<typeof CarResponse> {
    return this.careaService.updateCar(updateCar);
  }

  @Query(() => Car)
  getCarById(@Args('carId') carId: number): Promise<Car> {
    return this.careaService.getCarById(carId);
  }
}
