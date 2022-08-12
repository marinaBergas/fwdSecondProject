"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./handlers/user"));
const products_1 = __importDefault(require("./handlers/products"));
const orders_1 = __importDefault(require("./handlers/orders"));
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
const address = "0.0.0.0:3001";
const port = 3001;
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.post("/", function (req, res) {
    res.send("Hello WORLD");
});
(0, user_1.default)(app);
(0, products_1.default)(app);
(0, orders_1.default)(app);
app.listen(port, function () {
    console.log(`starting app on : ${address}`);
});
