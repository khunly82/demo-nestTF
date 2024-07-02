import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category';
import { Product } from 'src/entities/product';
import { Repository } from 'typeorm';

@Controller('product')
export class ProductController {

    constructor(
        @InjectRepository(Product)
        private productRepository: Repository<Product>
    ) {}

    @Get()
    getProducts() {
        // se connecter à la db et renvoyer les produits 
        return this.productRepository.find({
            relations: ['category']
        });
    }

    @Post()
    add(@Body() product: Product) {
        product.createDate = new Date();
        product.active = true;
        this.productRepository.save(product);
    }

    @Delete('/:id')
    remove(@Param('id') id: number) {
        this.productRepository.delete(id)
    }
}
