"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const products_json_1 = __importDefault(require("../data/products.json"));
let ProductService = class ProductService {
    constructor() {
        // The JSON file is small and static, so importing it keeps the service simple
        // and avoids filesystem path issues between dev, test, and build commands.
        this.products = products_json_1.default;
    }
    getAllProducts() {
        return this.products;
    }
    getProductsByType(type) {
        return this.products.filter((product) => product.type.toLowerCase() === type.toLowerCase());
    }
    getProductById(id) {
        return this.products.find((product) => product.id === id);
    }
    getAvailableTypes() {
        const types = new Set(this.products.map((p) => p.type));
        return Array.from(types).sort();
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, common_1.Injectable)()
], ProductService);
//# sourceMappingURL=product.service.js.map