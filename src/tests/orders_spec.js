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
const orders_1 = require("../models/orders");
const user_1 = require("../models/user");
const store = new orders_1.orderStore();
const userStore = new user_1.userStory();
let userInfo;
describe("orders model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            username: "mar",
            password_digest: "123456",
            email: "marina.sber@gmail.com",
        };
        userInfo = yield userStore.create(user);
        console.log("userRes", userInfo);
        const order = {
            id: "1",
            status: "accepts",
            ordernum: "12",
            user_id: userInfo.id,
            details: "det",
        };
        const result = yield store.create(order);
        // return result;
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
    it("update should be not be undefined ", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.update).toBeDefined();
    }));
    it("delete should return true ", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete("42");
        expect(result).toBe(true);
    }));
    it("update should return true  ", () => __awaiter(void 0, void 0, void 0, function* () {
        const order = {
            id: "1",
            status: "accepts",
            ordernum: "12",
            user_id: userInfo.id,
            details: "det",
        };
        const result = yield store.update(order);
        expect(result).toBe(true);
    }));
});
