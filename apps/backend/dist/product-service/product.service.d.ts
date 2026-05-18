export interface Product {
    id: number;
    name: string;
    type: string;
    price: number;
    image: string;
}
export declare class ProductService {
    private readonly products;
    getAllProducts(): Product[];
    getProductsByType(type: string): Product[];
    getProductById(id: number): Product | undefined;
    getAvailableTypes(): string[];
}
//# sourceMappingURL=product.service.d.ts.map