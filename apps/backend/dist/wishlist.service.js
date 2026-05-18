"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishlistService = void 0;
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product-service/product.service");
let WishlistService = class WishlistService {
    constructor(productService) {
        this.productService = productService;
        // In-memory storage is enough for the take-home task. A real app would move
        // this to a database so the wishlist survives server restarts.
        this.wishlist = new Map();
    }
    addToWishlist(productId) {
        const product = this.productService.getProductById(productId);
        if (!product) {
            throw new common_1.NotFoundException(`Product with id ${productId} not found`);
        }
        if (this.wishlist.has(productId)) {
            throw new common_1.BadRequestException(`Product ${product.name} is already in the wishlist`);
        }
        this.wishlist.set(productId, product);
        return product;
    }
    getWishlist() {
        return Array.from(this.wishlist.values());
    }
    removeFromWishlist(productId) {
        if (!this.wishlist.has(productId)) {
            throw new common_1.NotFoundException(`Product with id ${productId} not in wishlist`);
        }
        this.wishlist.delete(productId);
    }
    isInWishlist(productId) {
        return this.wishlist.has(productId);
    }
    clearWishlist() {
        this.wishlist.clear();
    }
};
exports.WishlistService = WishlistService;
exports.WishlistService = WishlistService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], WishlistService);
//# sourceMappingURL=wishlist.service.js.map