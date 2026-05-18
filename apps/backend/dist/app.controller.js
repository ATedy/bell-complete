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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const product_service_1 = require("./product-service/product.service");
const wishlist_service_1 = require("./wishlist.service");
let AppController = class AppController {
    // Nest injects these services through the constructor, which keeps routing
    // thin and leaves business logic in testable service classes.
    constructor(appService, productService, wishlistService) {
        this.appService = appService;
        this.productService = productService;
        this.wishlistService = wishlistService;
    }
    getStoreName() {
        return this.appService.getStoreName();
    }
    getProducts(type) {
        if (type) {
            return this.productService.getProductsByType(type);
        }
        return this.productService.getAllProducts();
    }
    getProductTypes() {
        return this.productService.getAvailableTypes();
    }
    getWishlist() {
        return this.wishlistService.getWishlist();
    }
    // ParseIntPipe validates the route param and converts it from string to number.
    addToWishlist(productId) {
        return this.wishlistService.addToWishlist(productId);
    }
    removeFromWishlist(productId) {
        this.wishlistService.removeFromWishlist(productId);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Get)('store-name'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AppController.prototype, "getStoreName", null);
__decorate([
    (0, common_1.Get)('products'),
    __param(0, (0, common_1.Query)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], AppController.prototype, "getProducts", null);
__decorate([
    (0, common_1.Get)('products/types'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getProductTypes", null);
__decorate([
    (0, common_1.Get)('wishlist'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], AppController.prototype, "getWishlist", null);
__decorate([
    (0, common_1.Post)('wishlist/:productId')
    // ParseIntPipe validates the route param and converts it from string to number.
    ,
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Object)
], AppController.prototype, "addToWishlist", null);
__decorate([
    (0, common_1.Delete)('wishlist/:productId'),
    __param(0, (0, common_1.Param)('productId', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], AppController.prototype, "removeFromWishlist", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [app_service_1.AppService,
        product_service_1.ProductService,
        wishlist_service_1.WishlistService])
], AppController);
//# sourceMappingURL=app.controller.js.map