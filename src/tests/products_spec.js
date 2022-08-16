"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const store = new products_1.productStore();
describe("products model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        console.log('first');
        const product = {
            id: 2,
            sku: "this is aproduct #12",
            description: "123456",
            price: 25
        };
        const result = yield store.create(product);
        return result;
    }));
    it("should have index", () => {
        expect(store.index).toBeDefined();
    });
    it("index should be list ", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).not.toEqual([]);
    }));
    it(" create should not be undefined ", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.create).toBeDefined();
    }));
    it("delete should be not be undefined ", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.delete).toBeDefined();
    }));
    it('fetch all products', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const product = {
                id: 2,
                sku: "this is aproduct #12",
                description: "123456",
                price: 25
            };
            yield store.create(product);
            const userList = yield store.index();
            expect(userList.length).toBeGreaterThan(0);
        });
    });
    it("update should be not be undefined ", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.update).toBeDefined();
    }));
    it("delete should return true ", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete("42");
        expect(result).toBe(true);
    }));
    it("update should return true ", () => __awaiter(void 0, void 0, void 0, function* () {
        const product = {
            id: "2",
            sku: "this is aproduct #12",
            description: "123456",
            price: 25
        };
        const result = yield store.update(product);
        expect(result).toBe(true);
    }));
});
