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
const bcrypt_1 = __importDefault(require("bcrypt"));
// const pepper = require("s-salt-pepper");
const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;
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
                const sql = "UPDATE users SET username = ($2), password_digest=($3), email=($4) WHERE id =($1)";
                const hash = bcrypt_1.default.hashSync(params.password_digest + pepper, parseInt(saltRounds));
                const result = yield conn.query(sql, [params.id, params.username, hash, params.email]);
                conn.release();
                return true;
            }
            catch (error) {
                throw new Error(`Could not update user`);
            }
        });
    }
    authenticate(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [u.id]);
                conn.release();
                if (result.rows.length) {
                    const user = result.rows[0];
                    if (bcrypt_1.default.compareSync(u.password_digest + pepper, user.password_digest)) {
                        return user;
                    }
                    else {
                        return "password isn not correct";
                    }
                }
                return "there is some thing wrong";
            }
            catch (error) {
                throw new Error(`Could not authenticate`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "INSERT INTO users (username, password_digest,email) VALUES($1, $2,$3) RETURNING *";
                const hash = bcrypt_1.default.hashSync(u.password_digest + pepper, parseInt(saltRounds));
                const result = yield conn.query(sql, [u.username, hash, u.email]);
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
            }
            catch (error) {
                throw new Error(`Could not delete this user `);
            }
        });
    }
}
exports.userStory = userStory;
