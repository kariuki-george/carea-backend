import { InputType } from '@nestjs/graphql';

@InputType()
export class SearchUserInput {
  email?: string;
  id?: string;
}
