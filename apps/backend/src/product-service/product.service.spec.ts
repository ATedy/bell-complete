import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product-service/product.service';
import { describe, it, expect, beforeEach } from 'vitest';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllProducts', () => {
    it('should return all 10 products', () => {
      const products = service.getAllProducts();
      expect(products).toHaveLength(10);
    });

    it('should return products with correct structure', () => {
      const products = service.getAllProducts();
      expect(products[0]).toHaveProperty('id');
      expect(products[0]).toHaveProperty('name');
      expect(products[0]).toHaveProperty('type');
      expect(products[0]).toHaveProperty('price');
      expect(products[0]).toHaveProperty('image');
    });
  });

  describe('getProductsByType', () => {
    it('should return products of specified type', () => {
      const electronics = service.getProductsByType('Electronics');
      expect(electronics.length).toBeGreaterThan(0);
      expect(electronics.every((p) => p.type === 'Electronics')).toBe(true);
    });

    it('should be case insensitive', () => {
      const electronics1 = service.getProductsByType('Electronics');
      const electronics2 = service.getProductsByType('electronics');
      expect(electronics1.length).toBe(electronics2.length);
    });

    it('should return empty array for non-existent type', () => {
      const products = service.getProductsByType('NonExistent');
      expect(products).toEqual([]);
    });
  });

  describe('getProductById', () => {
    it('should return product by id', () => {
      const product = service.getProductById(1);
      expect(product).toBeDefined();
      expect(product?.id).toBe(1);
    });

    it('should return undefined for non-existent id', () => {
      const product = service.getProductById(999);
      expect(product).toBeUndefined();
    });
  });

  describe('getAvailableTypes', () => {
    it('should return unique product types sorted', () => {
      const types = service.getAvailableTypes();
      expect(types).toContain('Electronics');
      expect(types).toContain('Books');
      expect(types).toContain('Clothing');
      expect(types).toEqual(types.slice().sort());
    });
  });
});
