import type { Product } from '../product-service/product.service';
import { AppService } from './app.service';
import { ProductService } from '../product-service/product.service';
import { WishlistService } from '../wishlist-service/wishlist.service';
export declare class AppController {
    private readonly appService;
    private readonly productService;
    private readonly wishlistService;
    constructor(appService: AppService, productService: ProductService, wishlistService: WishlistService);
    getStoreName(): {
        name: string;
    };
    getProducts(type?: string): Product[];
    getProductTypes(): string[];
    getWishlist(): Product[];
    addToWishlist(productId: number): Product;
    removeFromWishlist(productId: number): void;
}
//# sourceMappingURL=app.controller.d.ts.map