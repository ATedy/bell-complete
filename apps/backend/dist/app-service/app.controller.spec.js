"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const product_service_1 = require("../product-service/product.service");
const wishlist_service_1 = require("../wishlist-service/wishlist.service");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('AppController', () => {
    let controller;
    let wishlistService;
    (0, vitest_1.beforeEach)(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService, product_service_1.ProductService, wishlist_service_1.WishlistService],
        }).compile();
        controller = module.get(app_controller_1.AppController);
        wishlistService = module.get(wishlist_service_1.WishlistService);
        wishlistService.clearWishlist();
    });
    (0, vitest_1.it)('should be defined', () => {
        (0, vitest_1.expect)(controller).toBeDefined();
    });
    (0, vitest_1.describe)('getStoreName', () => {
        (0, vitest_1.it)('should return the store name', () => {
            const result = controller.getStoreName();
            (0, vitest_1.expect)(result).toEqual({ name: 'The Tech Library' });
        });
    });
    (0, vitest_1.describe)('getProducts', () => {
        (0, vitest_1.it)('should return all products', () => {
            const products = controller.getProducts();
            (0, vitest_1.expect)(products).toHaveLength(10);
        });
        (0, vitest_1.it)('should filter by type', () => {
            const products = controller.getProducts('Electronics');
            (0, vitest_1.expect)(products.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(products.every((p) => p.type === 'Electronics')).toBe(true);
        });
    });
    (0, vitest_1.describe)('getProductTypes', () => {
        (0, vitest_1.it)('should return available product types', () => {
            const types = controller.getProductTypes();
            (0, vitest_1.expect)(types.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(types).toContain('Electronics');
        });
    });
    (0, vitest_1.describe)('addToWishlist', () => {
        (0, vitest_1.it)('should add product to wishlist', () => {
            const product = controller.addToWishlist(1);
            (0, vitest_1.expect)(product.id).toBe(1);
        });
    });
    (0, vitest_1.describe)('getWishlist', () => {
        (0, vitest_1.it)('should return wishlist items', () => {
            controller.addToWishlist(1);
            controller.addToWishlist(2);
            const wishlist = controller.getWishlist();
            (0, vitest_1.expect)(wishlist).toHaveLength(2);
        });
    });
    (0, vitest_1.describe)('removeFromWishlist', () => {
        (0, vitest_1.it)('should remove product from wishlist', () => {
            controller.addToWishlist(1);
            controller.removeFromWishlist(1);
            const wishlist = controller.getWishlist();
            (0, vitest_1.expect)(wishlist).toHaveLength(0);
        });
    });
});
//# sourceMappingURL=app.controller.spec.js.map