import { Module } from '@nestjs/common';
import { ProductController } from './controllers/product/product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product';
import { Category } from './entities/category';
import { AuthController } from './controllers/auth/auth.controller';
import { User } from './entities/user';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guards/auth/auth.guard';

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
    ]),
    JwtModule.register({
      global: true,
      secret: 'y}&wLk@(B08S>&Go<OPy,72dp{7Z}`/"$X0yQu<xB}U1c41$9j',
      signOptions: {
        expiresIn: '86400s',
        algorithm: 'HS512',
      }
    })
  ],
  controllers: [ProductController, AuthController],
  providers: [],
})
export class AppModule {}
