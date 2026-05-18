import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ProductList } from './ProductList';
import * as api from './api';

describe('ProductList', () => {
  const mockOnAddToWishlist = vi.fn();
  const mockOnRemoveFromWishlist = vi.fn();

  const mockProducts: api.Product[] = [
    {
      id: 1,
      name: 'Product 1',
      type: 'Electronics',
      price: 99.99,
      image: 'https://example.com/1.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      type: 'Books',
      price: 29.99,
      image: 'https://example.com/2.jpg',
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should load and display products', async () => {
    vi.spyOn(api.apiService, 'getProductTypes').mockResolvedValue([
      'Electronics',
      'Books',
    ]);
    vi.spyOn(api.apiService, 'getProducts').mockResolvedValue(mockProducts);

    render(
      <ProductList
        wishlistItems={new Set()}
        onAddToWishlist={mockOnAddToWishlist}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('should display error message on api failure', async () => {
    vi.spyOn(api.apiService, 'getProductTypes').mockRejectedValue(
      new Error('API Error'),
    );

    render(
      <ProductList
        wishlistItems={new Set()}
        onAddToWishlist={mockOnAddToWishlist}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />,
    );

    await waitFor(() => {
      expect(screen.getByText(/API Error/)).toBeInTheDocument();
    });
  });
});
