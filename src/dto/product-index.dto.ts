import { Product } from "src/entities/product";

export class ProductIndexDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    categoryName: string;
    shortDescription: string;

    constructor(product: Product) {
        // mapping
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.shortDescription = product.description.slice(0, 50);
        this.price = product.price;
        this.categoryName = product.category.name;
    }
}