import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import * as api from '../api/api';

describe('App', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('fetches and displays the store name', async () => {
    vi.spyOn(api.apiService, 'getStoreName').mockResolvedValue(
      'The Tech Library',
    );
    vi.spyOn(api.apiService, 'getWishlist').mockResolvedValue([]);
    vi.spyOn(api.apiService, 'getProductTypes').mockResolvedValue([]);
    vi.spyOn(api.apiService, 'getProducts').mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('The Tech Library')).toBeInTheDocument();
    });
  });

  it('displays wishlist count from the backend', async () => {
    vi.spyOn(api.apiService, 'getStoreName').mockResolvedValue('Store');
    vi.spyOn(api.apiService, 'getWishlist').mockResolvedValue([
      {
        id: 1,
        name: 'Wireless Headphones',
        type: 'Electronics',
        price: 79.99,
        image: 'https://example.com/headphones.jpg',
      },
    ]);
    vi.spyOn(api.apiService, 'getProductTypes').mockResolvedValue([]);
    vi.spyOn(api.apiService, 'getProducts').mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Wishlist: 1')).toBeInTheDocument();
    });
  });

  it('handles store name fetch errors gracefully', async () => {
    vi.spyOn(api.apiService, 'getStoreName').mockRejectedValue(
      new Error('Network error'),
    );
    vi.spyOn(api.apiService, 'getProductTypes').mockResolvedValue([]);
    vi.spyOn(api.apiService, 'getProducts').mockResolvedValue([]);

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Network error/)).toBeInTheDocument();
    });
  });
});
