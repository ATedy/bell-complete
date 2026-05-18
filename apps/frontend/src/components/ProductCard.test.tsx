import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from './ProductCard';
import { Product } from '../api/api';

const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  type: 'Electronics',
  price: 99.99,
  image: 'https://example.com/image.jpg',
};

describe('ProductCard', () => {
  const mockOnAddToWishlist = vi.fn();
  const mockOnRemoveFromWishlist = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render product information', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInWishlist={false}
        onAddToWishlist={mockOnAddToWishlist}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />,
    );

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('$99.99')).toBeInTheDocument();
  });

  it('should render save button when not in wishlist', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInWishlist={false}
        onAddToWishlist={mockOnAddToWishlist}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />,
    );

    const button = screen.getByRole('button');
    expect(button.textContent).toContain('Save');
  });

  it('should render saved button when in wishlist', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInWishlist={true}
        onAddToWishlist={mockOnAddToWishlist}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />,
    );

    const button = screen.getByRole('button');
    expect(button.textContent).toContain('Saved');
  });

  it('should call onAddToWishlist when save button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInWishlist={false}
        onAddToWishlist={mockOnAddToWishlist}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnAddToWishlist).toHaveBeenCalledWith(mockProduct);
  });

  it('should call onRemoveFromWishlist when saved button is clicked', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInWishlist={true}
        onAddToWishlist={mockOnAddToWishlist}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(mockOnRemoveFromWishlist).toHaveBeenCalledWith(1);
  });

  it('should render product image', () => {
    render(
      <ProductCard
        product={mockProduct}
        isInWishlist={false}
        onAddToWishlist={mockOnAddToWishlist}
        onRemoveFromWishlist={mockOnRemoveFromWishlist}
      />,
    );

    const image = screen.getByAltText('Test Product') as HTMLImageElement;
    expect(image.src).toContain('image.jpg');
  });
});
