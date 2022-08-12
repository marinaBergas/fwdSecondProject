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
const book_1 = require("../models/book");
// import { booksStore } from "../book";
const store = new book_1.booksStore();
describe("book model", () => {
    it("shoud have index", () => {
        expect(store.index).toBeDefined();
    });
    it("index should be list ", () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.index();
        expect(result).toEqual([]);
    }));
    it('create method should add a book', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield store.create({
            title: 'Bridge to Terabithia',
            total_pages: 250,
            author: 'Katherine Paterson',
            type: 'Childrens',
        });
        expect(result).toEqual({
            id: 2,
            title: 'Bridge to Terabithia',
            total_pages: 250,
            author: 'Katherine Paterson',
            type: 'Childrens',
        });
    }));
});
