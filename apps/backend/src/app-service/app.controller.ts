import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import type { Product } from '../product-service/product.service';
import { AppService } from './app.service';
import { ProductService } from '../product-service/product.service';
import { WishlistService } from '../wishlist-service/wishlist.service';

@Controller()
export class AppController {
  // Nest injects these services through the constructor, which keeps routing
  // thin and leaves business logic in testable service classes.
  constructor(
    private readonly appService: AppService,
    private readonly productService: ProductService,
    private readonly wishlistService: WishlistService,
  ) { }

  @Get('store-name')
  getStoreName(): { name: string } {
    return this.appService.getStoreName();
  }

  @Get('products')
  getProducts(@Query('type') type?: string): Product[] {
    if (type) {
      return this.productService.getProductsByType(type);
    }
    return this.productService.getAllProducts();
  }

  @Get('products/types')
  getProductTypes(): string[] {
    return this.productService.getAvailableTypes();
  }

  @Get('wishlist')
  getWishlist(): Product[] {
    return this.wishlistService.getWishlist();
  }

  @Post('wishlist/:productId')
  // ParseIntPipe validates the route param and converts it from string to number.
  addToWishlist(@Param('productId', ParseIntPipe) productId: number): Product {
    return this.wishlistService.addToWishlist(productId);
  }

  @Delete('wishlist/:productId')
  removeFromWishlist(@Param('productId', ParseIntPipe) productId: number): void {
    this.wishlistService.removeFromWishlist(productId);
  }
}
