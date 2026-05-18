import { Module } from '@nestjs/common';
import { AppController } from './app-service/app.controller';
import { AppService } from './app-service/app.service';
import { ProductService } from './product-service/product.service';
import { WishlistService } from './wishlist-service/wishlist.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ProductService, WishlistService],
})
export class AppModule { }
