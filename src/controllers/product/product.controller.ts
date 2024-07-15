import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductAddForm } from 'src/dto/product-add.form';
import { ProductIndexDTO } from 'src/dto/product-index.dto';
import { Category } from 'src/entities/category';
import { Product } from 'src/entities/product';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Repository } from 'typeorm';

@Controller('product')
export class ProductController {

    constructor(
        // classe de connection à la table produit
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    @Get()
    async getProducts(@Query('category') categoryId) {
        // se connecter à la db et renvoyer les produits 
        // SELECT * FROM Product p
        // JOIN Category c ON p.categoryId = c.Id
        const products: Product[] = await this.productRepository.find({
            where: {
                categoryId
            },
            relations: ['category']
        });

        // transformer Product[] en  ProductIndexDTO[]
        return products.map(p => new ProductIndexDTO(p));
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    async addProduct(@Body() form: ProductAddForm) {

        let category = await this.categoryRepository.findOne({
            where: { name: form.categoryName }
        })

        if(category === null) {
            category = await this.categoryRepository.save({
                name: form.categoryName
            })
        }

        const product = { 
            ...form,
            createDate: new Date(),
            active: true,
            categoryId: category.id,
        }

        await this.productRepository.save(product);
    }

    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete('/:id')
    async removeProduct(@Param('id') id: number) {
        const product = await this.productRepository.findOne({
            where: { id }
        }) 
        if(product === null) {
            throw new NotFoundException();
        }
        this.productRepository.delete(id)
    }
}
