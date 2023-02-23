import { createUnionType, Field, ObjectType } from '@nestjs/graphql';
import { Category } from '../entities/category.entity';
import { ErrorInterface as Error } from '@carea/common/interfaces/error.entity';

@ObjectType()
class CategoryRes {
  @Field(() => Category)
  category: Category;
}

export const CategoryResponse = createUnionType({
  name: 'CategoryResponse',
  description:
    'Return error and Category union. Resolve error with error field and resolve Category with category field props',
  types: () => [Error, CategoryRes] as const,
  resolveType(value) {
    if (value.category) {
      return CategoryRes;
    }
    if (value.error) {
      return Error;
    }
    return null;
  },
});
