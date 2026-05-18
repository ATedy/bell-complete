import { describe, it, expect, beforeEach, vi } from 'vitest';
import { apiService, Product } from './api';

describe('apiService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getStoreName', () => {
    it('should fetch store name', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ name: 'The Tech Library' }),
      }) as unknown as typeof fetch;

      const name = await apiService.getStoreName();
      expect(name).toBe('The Tech Library');
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/store-name',
      );
    });

    it('should throw error on fetch failure', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
      }) as unknown as typeof fetch;

      await expect(apiService.getStoreName()).rejects.toThrow();
    });
  });

  describe('getProducts', () => {
    it('should fetch all products without filter', async () => {
      const mockProducts: Product[] = [
        {
          id: 1,
          name: 'Product 1',
          type: 'Electronics',
          price: 99.99,
          image: 'https://example.com/1.jpg',
        },
      ];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      }) as unknown as typeof fetch;

      const products = await apiService.getProducts();
      expect(products).toEqual(mockProducts);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/products',
      );
    });

    it('should fetch products with type filter', async () => {
      const fetchMock = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve([]),
      });
      globalThis.fetch = fetchMock as unknown as typeof fetch;

      await apiService.getProducts('Electronics');
      const url = fetchMock.mock.calls[0][0];
      expect(url.toString()).toContain('type=Electronics');
    });
  });

  describe('getProductTypes', () => {
    it('should fetch available product types', async () => {
      const mockTypes = ['Electronics', 'Books', 'Clothing'];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockTypes),
      }) as unknown as typeof fetch;

      const types = await apiService.getProductTypes();
      expect(types).toEqual(mockTypes);
    });
  });

  describe('getWishlist', () => {
    it('should fetch wishlist', async () => {
      const mockWishlist: Product[] = [];

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockWishlist),
      }) as unknown as typeof fetch;

      const wishlist = await apiService.getWishlist();
      expect(wishlist).toEqual(mockWishlist);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/wishlist',
      );
    });
  });

  describe('addToWishlist', () => {
    it('should add product to wishlist', async () => {
      const mockProduct: Product = {
        id: 1,
        name: 'Product 1',
        type: 'Electronics',
        price: 99.99,
        image: 'https://example.com/1.jpg',
      };

      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      }) as unknown as typeof fetch;

      const product = await apiService.addToWishlist(1);
      expect(product).toEqual(mockProduct);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/wishlist/1',
        { method: 'POST' },
      );
    });

    it('should throw error on duplicate', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: false,
        json: () => Promise.resolve({ message: 'Already in wishlist' }),
      }) as unknown as typeof fetch;

      await expect(apiService.addToWishlist(1)).rejects.toThrow();
    });
  });

  describe('removeFromWishlist', () => {
    it('should remove product from wishlist', async () => {
      globalThis.fetch = vi.fn().mockResolvedValue({
        ok: true,
      }) as unknown as typeof fetch;

      await apiService.removeFromWishlist(1);
      expect(globalThis.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/api/wishlist/1',
        { method: 'DELETE' },
      );
    });
  });
});
