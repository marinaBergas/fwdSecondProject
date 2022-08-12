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
const store = new book_1.booksStore();
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield store.index();
    res.json(book);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield store.create(req.body.id);
    res.json(book);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const article = {
        title: req.body.title,
        author: req.body.author,
        total_pages: req.body.total_pages,
        type: req.body.type,
    };
    const book = yield store.create(article);
    res.json(book);
});
const destroy = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield store.delete(req.body.id);
    res.json(book);
});
const books_route = (app) => {
    app.get("/article", index);
    //   app.post("/article",create)
    //   app.delete("/article/:id",destroy)
    //   app.get("/artcle/:id",show)
};
exports.default = books_route;
