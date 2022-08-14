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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const service_1 = __importDefault(require("../service"));
const request = (0, supertest_1.default)(service_1.default);
describe("Test endpoint responses", () => {
    it("gets the api endpoint", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/");
        expect(response.status).toBe(200);
    }));
});
////users
describe("Test endpoint user", () => {
    it("get the api endpoint for users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/users");
        expect(response.status).toBe(200);
    }));
    it("post the api endpoint for users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/users");
        expect(response.status).toBe(200);
    }));
    it("put the api endpoint for users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put("/users/32");
        expect(response.status).toBe(200);
    }));
    it("delete the api endpoint for users", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete("/users/32");
        expect(response.status).toBe(200);
    }));
});
//products
describe("Test endpoint products", () => {
    it("get the api endpoint for products", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/product");
        expect(response.status).toBe(200);
    }));
    it("post the api endpoint for products", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/product");
        expect(response.status).toBe(200);
    }));
    it("put the api endpoint for products", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put("/product/2");
        expect(response.status).toBe(200);
    }));
    it("delete the api endpoint for products", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete("/product/2");
        expect(response.status).toBe(200);
    }));
});
//orders
describe("Test endpoint orders", () => {
    it("get the api endpoint for orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get("/order");
        expect(response.status).toBe(200);
    }));
    it("post the api endpoint for orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.post("/order");
        expect(response.status).toBe(200);
    }));
    it("put the api endpoint for orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.put("/order/2");
        expect(response.status).toBe(200);
    }));
    it("delete the api endpoint for orders", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.delete("/order/2");
        expect(response.status).toBe(200);
    }));
});
