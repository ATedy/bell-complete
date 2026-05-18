const API_BASE_URL = 'http://localhost:3000/api';

export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
}

export const apiService = {
  getStoreName: async (): Promise<string> => {
    const res = await fetch(`${API_BASE_URL}/store-name`);
    if (!res.ok) throw new Error('Failed to fetch store name');
    const data = await res.json();
    return data.name;
  },

  getProducts: async (type?: string): Promise<Product[]> => {
    // URLSearchParams handles query-string encoding for us.
    const url = new URL(`${API_BASE_URL}/products`);
    if (type) url.searchParams.append('type', type);
    const res = await fetch(url.toString());
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  },

  getProductTypes: async (): Promise<string[]> => {
    const res = await fetch(`${API_BASE_URL}/products/types`);
    if (!res.ok) throw new Error('Failed to fetch product types');
    return res.json();
  },

  getWishlist: async (): Promise<Product[]> => {
    const res = await fetch(`${API_BASE_URL}/wishlist`);
    if (!res.ok) throw new Error('Failed to fetch wishlist');
    return res.json();
  },

  addToWishlist: async (productId: number): Promise<Product> => {
    const res = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
      method: 'POST',
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || 'Failed to add to wishlist');
    }
    return res.json();
  },

  removeFromWishlist: async (productId: number): Promise<void> => {
    const res = await fetch(`${API_BASE_URL}/wishlist/${productId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to remove from wishlist');
  },
};
