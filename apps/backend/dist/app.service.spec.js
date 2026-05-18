"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const app_service_1 = require("./app.service");
const vitest_1 = require("vitest");
(0, vitest_1.describe)('AppService', () => {
    let service;
    (0, vitest_1.beforeEach)(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [app_service_1.AppService],
        }).compile();
        service = module.get(app_service_1.AppService);
    });
    (0, vitest_1.it)('should be defined', () => {
        (0, vitest_1.expect)(service).toBeDefined();
    });
    (0, vitest_1.describe)('getStoreName', () => {
        (0, vitest_1.it)('should return "The Tech Library"', () => {
            const result = service.getStoreName();
            (0, vitest_1.expect)(result).toEqual({ name: 'The Tech Library' });
        });
    });
});
//# sourceMappingURL=app.service.spec.js.map