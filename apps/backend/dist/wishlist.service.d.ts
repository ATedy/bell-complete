import type { Product } from './product-service/product.service';
import { ProductService } from './product-service/product.service';
export declare class WishlistService {
    private productService;
    private wishlist;
    constructor(productService: ProductService);
    addToWishlist(productId: number): Product;
    getWishlist(): Product[];
    removeFromWishlist(productId: number): void;
    isInWishlist(productId: number): boolean;
    clearWishlist(): void;
}
//# sourceMappingURL=wishlist.service.d.ts.map