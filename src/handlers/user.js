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
const bcrypt = require("bcrypt");
dotenv_1.default.config();
const store = new user_1.userStory();
const create = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userS = {
            username: _req.body.username,
            password_digest: _req.body.password_digest,
            email: _req.body.email,
        };
        const user = yield store.create(userS);
        let token = jsonwebtoken_1.default.sign({ user }, process.env.TOKEN_SECRET);
        res.json({ "user-token": token });
        res.end();
    }
    catch (error) {
        res.json({ error: "can not add user" });
        res.status(401);
    }
});
const updateUser = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: _req.params.id,
        username: _req.body.username,
        password_digest: _req.body.password_digest,
        email: _req.body.email,
    };
    try {
        const userUpdate = yield store.update(user);
        res.json("user updated successfully");
    }
    catch (error) {
        res.json({ error: "can not update user" });
        res.status(401);
    }
});
const login = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = {
        id: _req.params.id,
        username: _req.body.username,
        password_digest: _req.body.password_digest,
        email: _req.body.email,
    };
    try {
        const userRes = yield store.authenticate(user);
        res.json(userRes);
    }
    catch (error) {
        res.json("can not auth user");
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
        res.json({ error: "user not authenticate" });
        res.status(401);
    }
};
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
    const user_id = parseInt(req.params.id);
    try {
        if (user_id !== decoded.user.id) {
            res.json("the user token is incorrect");
        }
        else {
            const user = yield store.show(req.params.id);
            res.json(user);
        }
    }
    catch (error) {
        res.json({ error: "can not show the user" });
        res.status(401);
    }
});
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield store.index();
        res.json(user);
    }
    catch (error) {
        res.json({ error: "can not show users" });
        res.status(401);
    }
});
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedUser = yield store.delete(req.params.id);
        res.json("user deleted successfully");
    }
    catch (error) {
        res.json({ error: "can not delete user" });
        res.status(401);
    }
});
const users_route = (app) => {
    app.get("/users", verifyAuthToken, index);
    app.get("/users/:id", verifyAuthToken, show);
    app.put("/users/:id", verifyAuthToken, updateUser);
    app.post("/users", create);
    app.get("/users/:id/auth", verifyAuthToken, login);
    app.delete("/users/:id", verifyAuthToken, deleteUser);
};
exports.default = users_route;
