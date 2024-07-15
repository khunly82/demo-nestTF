import { IsNotEmpty } from "class-validator";

export class LoginForm {

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    password: string;
}