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
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        sku: req.body.sku,
        description: req.body.description,
        price: req.body.price,
    };
    const productRes = yield store.create(product);
    res.json(productRes);
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRes = yield store.show(req.params.id);
    res.json(productRes);
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRes = yield store.index();
    res.json(productRes);
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productRes = yield store.delete(req.params.id);
    res.json(productRes);
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        id: req.params.id,
        sku: req.body.sku,
        description: req.body.description,
        price: req.body.price,
    };
    const userUpdate = yield store.update(product);
    res.json("product updated successfully");
});
const products_route = (app) => {
    app.get("/product", index);
    app.post("/product", create);
    app.delete("/product/:id", deleteProduct);
    app.get("/product/:id", show);
    app.put("/product/:id", updateProduct);
};
exports.default = products_route;
