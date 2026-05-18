import { Injectable } from '@nestjs/common';
import products from '../data/products.json';

export interface Product {
  id: number;
  name: string;
  type: string;
  price: number;
  image: string;
}

@Injectable()
export class ProductService {
  // The JSON file is small and static, so importing it keeps the service simple
  // and avoids filesystem path issues between dev, test, and build commands.
  private readonly products = products as Product[];

  getAllProducts(): Product[] {
    return this.products;
  }

  getProductsByType(type: string): Product[] {
    return this.products.filter(
      (product) => product.type.toLowerCase() === type.toLowerCase(),
    );
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  getAvailableTypes(): string[] {
    const types = new Set(this.products.map((p) => p.type));
    return Array.from(types).sort();
  }
}
