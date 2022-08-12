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
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const store = new user_1.userStory();
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userS = {
        username: _req.body.username,
        password: _req.body.password_digest,
    };
    const user = yield store.create(userS);
    let token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
    res.json({ "user-token": token });
    res.end();
});
const updateUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: _req.params.id,
        username: _req.body.username,
        password: _req.body.password_digest
    };
    const userUpdate = yield store.update(user);
    res.json('user updated successfully');
});
const authenticate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.authenticate(req.body.username, req.body.password);
    res.json(user);
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
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.show(req.params.id);
    res.json(user);
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield store.index();
    res.json(user);
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedUser = yield store.delete(req.params.id);
    res.json('user deleted successfully');
});
const users_route = (app) => {
    app.get('/users', index);
    app.get("/users/:id", show);
    app.put("/users/:id", updateUser);
    app.post("/users", create);
    app.post("/users/auth", verifyAuthToken, authenticate);
    app.delete("/users/:id", deleteUser);
};
exports.default = users_route;
