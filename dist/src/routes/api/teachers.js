"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const teachers = express_1.default.Router();
teachers.get("/", (req, res) => {
    // console.log(req.query.title);
    res.send("server on work teachers");
});
exports.default = teachers;
