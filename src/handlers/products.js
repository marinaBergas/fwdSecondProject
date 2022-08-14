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
const products_1 = require("../models/products");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const store = new products_1.productStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        sku: req.body.sku,
        description: req.body.description,
        price: req.body.price,
    };
    try {
        const productRes = yield store.create(product);
        res.json(productRes);
    }
    catch (error) {
        res.json({ error: "can not add product" });
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRes = yield store.show(req.params.id);
        res.json(productRes);
    }
    catch (error) {
        res.json({ error: "can not show product" });
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRes = yield store.index();
        res.json(productRes);
    }
    catch (error) {
        res.json({ error: "can not show products" });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productRes = yield store.delete(req.params.id);
        res.json(productRes);
    }
    catch (error) {
        res.json({ error: "can not delete product" });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        id: req.params.id,
        sku: req.body.sku,
        description: req.body.description,
        price: req.body.price,
    };
    try {
        const userUpdate = yield store.update(product);
        res.json("product updated successfully");
    }
    catch (error) {
        res.json({ error: "can not update product" });
    }
});
const verifyAuthToken = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (error) {
        res.json({ error: "user not authenticate" });
        res.status(401);
    }
};
const products_route = (app) => {
    app.get("/product", index);
    app.post("/product", verifyAuthToken, create);
    app.delete("/product/:id", verifyAuthToken, deleteProduct);
    app.get("/product/:id", show);
    app.put("/product/:id", verifyAuthToken, updateProduct);
};
exports.default = products_route;
