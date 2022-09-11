import { InputType } from "@nestjs/graphql";

@InputType()
export class CreateChatInput{
userId:string;
carId:string
}