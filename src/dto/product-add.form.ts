import { IsNotEmpty, Matches, Max, Min, MinDate } from "class-validator";

export class ProductAddForm {

    @IsNotEmpty()
    name: string;

    description: string;

    @Min(0)
    @Max(1000)
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    categoryName: string;

    // 82.06.05-203.16
    // @Matches(/^[0-9]{2}\.[0-9]{2}\.[0-9]{2}-[0-9]{3}\.[0-9]{2}$/)
    // ssn: string
}