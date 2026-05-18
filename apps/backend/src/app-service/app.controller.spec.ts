import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductService } from '../product-service/product.service';
import { WishlistService } from '../wishlist-service/wishlist.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('AppController', () => {
  let controller: AppController;
  let wishlistService: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, ProductService, WishlistService],
    }).compile();

    controller = module.get<AppController>(AppController);
    wishlistService = module.get<WishlistService>(WishlistService);
    wishlistService.clearWishlist();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getStoreName', () => {
    it('should return the store name', () => {
      const result = controller.getStoreName();
      expect(result).toEqual({ name: 'The Tech Library' });
    });
  });

  describe('getProducts', () => {
    it('should return all products', () => {
      const products = controller.getProducts();
      expect(products).toHaveLength(10);
    });

    it('should filter by type', () => {
      const products = controller.getProducts('Electronics');
      expect(products.length).toBeGreaterThan(0);
      expect(products.every((p) => p.type === 'Electronics')).toBe(true);
    });
  });

  describe('getProductTypes', () => {
    it('should return available product types', () => {
      const types = controller.getProductTypes();
      expect(types.length).toBeGreaterThan(0);
      expect(types).toContain('Electronics');
    });
  });

  describe('addToWishlist', () => {
    it('should add product to wishlist', () => {
      const product = controller.addToWishlist(1);
      expect(product.id).toBe(1);
    });
  });

  describe('getWishlist', () => {
    it('should return wishlist items', () => {
      controller.addToWishlist(1);
      controller.addToWishlist(2);
      const wishlist = controller.getWishlist();
      expect(wishlist).toHaveLength(2);
    });
  });

  describe('removeFromWishlist', () => {
    it('should remove product from wishlist', () => {
      controller.addToWishlist(1);
      controller.removeFromWishlist(1);
      const wishlist = controller.getWishlist();
      expect(wishlist).toHaveLength(0);
    });
  });
});
