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
const orders_1 = require("../models/orders");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new orders_1.orderStore();
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        status: req.body.status,
        ordernum: req.body.ordernum,
        user_id: req.body.user_id,
        details: req.body.details
    };
    try {
        const orderRes = yield store.create(order);
        res.json(orderRes);
    }
    catch (error) {
        res.json({ error: "can not add order" });
        res.status(401);
    }
});
const show = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderRes = yield store.show(_req.params.id);
        res.json(orderRes);
    }
    catch (error) {
        res.json({ error: "can not show order" });
        res.status(401);
    }
});
const index = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderRes = yield store.index();
        res.json(orderRes);
    }
    catch (error) {
        res.json({ error: "can not show orders" });
        res.status(401);
    }
});
const deleteOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderRes = yield store.delete(_req.params.id);
        res.json(orderRes);
    }
    catch (error) {
        res.json({ error: "can not delete order" });
        res.status(401);
    }
});
const updateOrder = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        id: _req.params.id,
        status: _req.body.status,
        ordernum: _req.body.ordernum,
        user_id: _req.body.user_id,
        details: _req.body.details
    };
    try {
        const userUpdate = yield store.update(order);
        res.json('order updated successfully');
    }
    catch (error) {
        res.json({ error: "can not update order" });
        res.status(401);
    }
});
const orderProduct = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order_product = {
        quantity: _req.body.quantity,
        order_id: _req.body.order_id,
        product_id: _req.body.product_id
    };
    try {
        const userUpdate = yield store.addProduct(order_product);
        res.json('orderProduct add successfully');
    }
    catch (error) {
        res.json({ error: "can not add orderProduct" });
        res.status(401);
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
        res.json({ error: "user is not authenticate" });
        res.status(401);
    }
};
const order_route = (app) => {
    app.get("/order", verifyAuthToken, index);
    app.post("/order", verifyAuthToken, create);
    app.delete("/order/:id", verifyAuthToken, deleteOrder);
    app.get("/order/:id", verifyAuthToken, show);
    app.put("/order/:id", verifyAuthToken, updateOrder);
    app.post("/addProduct", verifyAuthToken, orderProduct);
};
exports.default = order_route;
