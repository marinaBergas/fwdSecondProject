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
exports.userStory = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt = require("bcrypt");
const pepper = require("s-salt-pepper");
class userStory {
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "SELECT * FROM users WHERE id=($1)";
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not find users ${id} . Error:${error}`);
            }
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "UPDATE users SET username = ($2), password_digest=($3) WHERE id =($1)";
                const saltRounds = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(params.password + pepper, parseInt(saltRounds));
                const result = yield conn.query(sql, [params.id, params.username, hash]);
                conn.release();
                return true;
            }
            catch (error) {
                throw new Error(`Could not update user`);
            }
        });
    }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("username", password);
            const conn = yield database_1.default.connect();
            const sql = "SELECT password_digest FROM users WHERE username=($1)";
            const result = yield conn.query(sql, [username]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt.compare(password + pepper, user.password_digest)) {
                    return user;
                }
            }
            return null;
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";
                const saltRounds = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
                const result = yield conn.query(sql, [u.username, hash]);
                conn.release();
                const user = result.rows[0];
                return user;
            }
            catch (error) {
                throw new Error(`Could not add new user ${u.username}`);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM users";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not connect users `);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "DELETE FROM users WHERE id=($1);";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return true;
                console.log("row", result.rows);
                // return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not delete this user `);
            }
        });
    }
}
exports.userStory = userStory;
