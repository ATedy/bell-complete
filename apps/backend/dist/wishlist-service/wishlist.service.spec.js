"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const wishlist_service_1 = require("../wishlist-service/wishlist.service");
const product_service_1 = require("../product-service/product.service");
const common_1 = require("@nestjs/common");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('WishlistService', () => {
    let service;
    (0, vitest_1.beforeEach)(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [wishlist_service_1.WishlistService, product_service_1.ProductService],
        }).compile();
        service = module.get(wishlist_service_1.WishlistService);
        service.clearWishlist();
    });
    (0, vitest_1.it)('should be defined', () => {
        (0, vitest_1.expect)(service).toBeDefined();
    });
    (0, vitest_1.describe)('addToWishlist', () => {
        (0, vitest_1.it)('should add product to wishlist', () => {
            const product = service.addToWishlist(1);
            (0, vitest_1.expect)(product.id).toBe(1);
            (0, vitest_1.expect)(service.isInWishlist(1)).toBe(true);
        });
        (0, vitest_1.it)('should throw error for non-existent product', () => {
            (0, vitest_1.expect)(() => service.addToWishlist(999)).toThrow(common_1.NotFoundException);
        });
        (0, vitest_1.it)('should throw error if product already in wishlist', () => {
            service.addToWishlist(1);
            (0, vitest_1.expect)(() => service.addToWishlist(1)).toThrow(common_1.BadRequestException);
        });
    });
    (0, vitest_1.describe)('getWishlist', () => {
        (0, vitest_1.it)('should return empty array initially', () => {
            (0, vitest_1.expect)(service.getWishlist()).toEqual([]);
        });
        (0, vitest_1.it)('should return all added products', () => {
            service.addToWishlist(1);
            service.addToWishlist(2);
            const wishlist = service.getWishlist();
            (0, vitest_1.expect)(wishlist).toHaveLength(2);
        });
    });
    (0, vitest_1.describe)('removeFromWishlist', () => {
        (0, vitest_1.it)('should remove product from wishlist', () => {
            service.addToWishlist(1);
            service.removeFromWishlist(1);
            (0, vitest_1.expect)(service.isInWishlist(1)).toBe(false);
        });
        (0, vitest_1.it)('should throw error if product not in wishlist', () => {
            (0, vitest_1.expect)(() => service.removeFromWishlist(1)).toThrow(common_1.NotFoundException);
        });
    });
    (0, vitest_1.describe)('isInWishlist', () => {
        (0, vitest_1.it)('should return true if product in wishlist', () => {
            service.addToWishlist(1);
            (0, vitest_1.expect)(service.isInWishlist(1)).toBe(true);
        });
        (0, vitest_1.it)('should return false if product not in wishlist', () => {
            (0, vitest_1.expect)(service.isInWishlist(1)).toBe(false);
        });
    });
    (0, vitest_1.describe)('clearWishlist', () => {
        (0, vitest_1.it)('should clear all items from wishlist', () => {
            service.addToWishlist(1);
            service.addToWishlist(2);
            service.clearWishlist();
            (0, vitest_1.expect)(service.getWishlist()).toEqual([]);
        });
    });
});
//# sourceMappingURL=wishlist.service.spec.js.map