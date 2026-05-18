import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import type { Product } from '../product-service/product.service';
import { ProductService } from '../product-service/product.service';

@Injectable()
export class WishlistService {
  // In-memory storage is enough for the take-home task. A real app would move
  // this to a database so the wishlist survives server restarts.
  private wishlist: Map<number, Product> = new Map();

  constructor(private productService: ProductService) { }

  addToWishlist(productId: number): Product {
    const product = this.productService.getProductById(productId);

    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    if (this.wishlist.has(productId)) {
      throw new BadRequestException(
        `Product ${product.name} is already in the wishlist`,
      );
    }

    this.wishlist.set(productId, product);
    return product;
  }

  getWishlist(): Product[] {
    return Array.from(this.wishlist.values());
  }

  removeFromWishlist(productId: number): void {
    if (!this.wishlist.has(productId)) {
      throw new NotFoundException(`Product with id ${productId} not in wishlist`);
    }

    this.wishlist.delete(productId);
  }

  isInWishlist(productId: number): boolean {
    return this.wishlist.has(productId);
  }

  clearWishlist(): void {
    this.wishlist.clear();
  }
}
