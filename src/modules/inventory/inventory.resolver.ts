import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt.guard';
import { AdminGuard } from '@/modules/auth/guards/admin.guard';
import { InventoryService } from './inventory.service';
import { CreateCarInput } from './dto/createCar.dto';
import { CreateCategoryInput, UpdateCategoryInput } from './dto/category.dto';
import { GetCarsInput } from './dto/getCars.dto';
import { UpdateCarInput } from './dto/updateCar.dto';
import { Car } from './entities/car.entity';
import { Category } from './entities/category.entity';
import { GetCarsResponse } from './res/getCars.res';

@Resolver('inventory')
export class InventoryResolver {
  constructor(private readonly inventoryService: InventoryService) {}

  @Query(() => GetCarsResponse)
  getCars(
    @Args('getCarsInput') getCarsInput: GetCarsInput
  ): Promise<GetCarsResponse> {
    return this.inventoryService.getCars(getCarsInput);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Mutation(() => Category)
  createCategory(
    @Args('createCategory') createCategory: CreateCategoryInput
  ): Promise<Category> {
    return this.inventoryService.createCategory(createCategory);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Mutation(() => Boolean)
  deleteCategory(@Args('deleteCategory') categoryId: number): Promise<boolean> {
    return this.inventoryService.deleteCategory(categoryId);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategory') updateCategory: UpdateCategoryInput
  ): Promise<Category> {
    return this.inventoryService.updateCategory(updateCategory);
  }

  @Query(() => [Category])
  getCarCategories(): Promise<Category[]> {
    return this.inventoryService.getCarCategories();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @Mutation(() => Car)
  createCar(@Args('createCar') createCar: CreateCarInput): Promise<Car> {
    return this.inventoryService.createCar(createCar);
  }

  @Mutation(() => Car)
  @UseGuards(JwtAuthGuard, AdminGuard)
  updateCar(@Args('updateCar') updateCar: UpdateCarInput): Promise<Car> {
    return this.inventoryService.updateCar(updateCar);
  }

  @Query(() => Car)
  getCarById(@Args('carId') carId: number): Promise<Car> {
    return this.inventoryService.getCarById(carId);
  }
}
