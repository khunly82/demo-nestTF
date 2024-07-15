import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product';
import { Category } from './entities/category';
import { AuthController } from './controllers/auth/auth.controller';
import { User } from './entities/user';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: 'localhost',
      port: 1433,
      username: 'sa',
      password: 'test1234=',
      synchronize: true,
      database: 'stockManager',
      entities: [
        Product, 
        Category,
        User,
      ],
      options: {
        encrypt: false
      }
    }),
    TypeOrmModule.forFeature([
      Product, 
      Category,
      User,
    ])
  ],
  controllers: [ProductController, AuthController],
  providers: [],
})
export class AppModule {}
