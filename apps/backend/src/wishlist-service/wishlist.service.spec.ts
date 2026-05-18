import { Test, TestingModule } from '@nestjs/testing';
import { WishlistService } from '../wishlist-service/wishlist.service';
import { ProductService } from '../product-service/product.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { describe, it, expect, beforeEach } from 'vitest';

describe('WishlistService', () => {
  let service: WishlistService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WishlistService, ProductService],
    }).compile();

    service = module.get<WishlistService>(WishlistService);
    service.clearWishlist();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('addToWishlist', () => {
    it('should add product to wishlist', () => {
      const product = service.addToWishlist(1);
      expect(product.id).toBe(1);
      expect(service.isInWishlist(1)).toBe(true);
    });

    it('should throw error for non-existent product', () => {
      expect(() => service.addToWishlist(999)).toThrow(NotFoundException);
    });

    it('should throw error if product already in wishlist', () => {
      service.addToWishlist(1);
      expect(() => service.addToWishlist(1)).toThrow(BadRequestException);
    });
  });

  describe('getWishlist', () => {
    it('should return empty array initially', () => {
      expect(service.getWishlist()).toEqual([]);
    });

    it('should return all added products', () => {
      service.addToWishlist(1);
      service.addToWishlist(2);
      const wishlist = service.getWishlist();
      expect(wishlist).toHaveLength(2);
    });
  });

  describe('removeFromWishlist', () => {
    it('should remove product from wishlist', () => {
      service.addToWishlist(1);
      service.removeFromWishlist(1);
      expect(service.isInWishlist(1)).toBe(false);
    });

    it('should throw error if product not in wishlist', () => {
      expect(() => service.removeFromWishlist(1)).toThrow(NotFoundException);
    });
  });

  describe('isInWishlist', () => {
    it('should return true if product in wishlist', () => {
      service.addToWishlist(1);
      expect(service.isInWishlist(1)).toBe(true);
    });

    it('should return false if product not in wishlist', () => {
      expect(service.isInWishlist(1)).toBe(false);
    });
  });

  describe('clearWishlist', () => {
    it('should clear all items from wishlist', () => {
      service.addToWishlist(1);
      service.addToWishlist(2);
      service.clearWishlist();
      expect(service.getWishlist()).toEqual([]);
    });
  });
});
