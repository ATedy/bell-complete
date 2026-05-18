"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const product_service_1 = require("./product.service");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('ProductService', () => {
    let service;
    (0, vitest_1.beforeEach)(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [product_service_1.ProductService],
        }).compile();
        service = module.get(product_service_1.ProductService);
    });
    (0, vitest_1.it)('should be defined', () => {
        (0, vitest_1.expect)(service).toBeDefined();
    });
    (0, vitest_1.describe)('getAllProducts', () => {
        (0, vitest_1.it)('should return all 10 products', () => {
            const products = service.getAllProducts();
            (0, vitest_1.expect)(products).toHaveLength(10);
        });
        (0, vitest_1.it)('should return products with correct structure', () => {
            const products = service.getAllProducts();
            (0, vitest_1.expect)(products[0]).toHaveProperty('id');
            (0, vitest_1.expect)(products[0]).toHaveProperty('name');
            (0, vitest_1.expect)(products[0]).toHaveProperty('type');
            (0, vitest_1.expect)(products[0]).toHaveProperty('price');
            (0, vitest_1.expect)(products[0]).toHaveProperty('image');
        });
    });
    (0, vitest_1.describe)('getProductsByType', () => {
        (0, vitest_1.it)('should return products of specified type', () => {
            const electronics = service.getProductsByType('Electronics');
            (0, vitest_1.expect)(electronics.length).toBeGreaterThan(0);
            (0, vitest_1.expect)(electronics.every((p) => p.type === 'Electronics')).toBe(true);
        });
        (0, vitest_1.it)('should be case insensitive', () => {
            const electronics1 = service.getProductsByType('Electronics');
            const electronics2 = service.getProductsByType('electronics');
            (0, vitest_1.expect)(electronics1.length).toBe(electronics2.length);
        });
        (0, vitest_1.it)('should return empty array for non-existent type', () => {
            const products = service.getProductsByType('NonExistent');
            (0, vitest_1.expect)(products).toEqual([]);
        });
    });
    (0, vitest_1.describe)('getProductById', () => {
        (0, vitest_1.it)('should return product by id', () => {
            const product = service.getProductById(1);
            (0, vitest_1.expect)(product).toBeDefined();
            (0, vitest_1.expect)(product?.id).toBe(1);
        });
        (0, vitest_1.it)('should return undefined for non-existent id', () => {
            const product = service.getProductById(999);
            (0, vitest_1.expect)(product).toBeUndefined();
        });
    });
    (0, vitest_1.describe)('getAvailableTypes', () => {
        (0, vitest_1.it)('should return unique product types sorted', () => {
            const types = service.getAvailableTypes();
            (0, vitest_1.expect)(types).toContain('Electronics');
            (0, vitest_1.expect)(types).toContain('Books');
            (0, vitest_1.expect)(types).toContain('Clothing');
            (0, vitest_1.expect)(types).toEqual(types.slice().sort());
        });
    });
});
//# sourceMappingURL=product.service.spec.js.map