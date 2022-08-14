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
const user_1 = require("../models/user");
const store = new user_1.userStory();
describe("user model", () => {
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
    it('fetch all users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const user = {
                "username": "mar",
                "password_digest": "123456",
                "email": "marina.sber@gmail.com"
            };
            yield store.create(user);
            const userList = yield store.index();
            expect(userList.length).toBeGreaterThan(0);
        });
    });
    it("delete should be not be undefined ", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.delete).toBeDefined();
    }));
    it("delete should return true ", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.delete("42");
        expect(result).toBe(true);
    }));
    it("update should return true ", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = {
            id: "32",
            username: "mar",
            password_digest: "123456",
            email: "marina.sber@gmail.com"
        };
        const result = yield store.update(user);
        expect(result).toBe(true);
    }));
    it("authenticate should be not be undefined ", () => __awaiter(void 0, void 0, void 0, function* () {
        expect(store.authenticate).toBeDefined();
    }));
});
