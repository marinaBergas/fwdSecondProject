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
exports.productStore = void 0;
const database_1 = __importDefault(require("../database"));
class productStore {
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "INSERT INTO products (sku,description,price)VALUES($1, $2, $3) RETURNING *";
                const result = yield connect.query(sql, [p.sku, p.description, p.price]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not add new product${p.sku} `);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM products WHERE id=($1)";
                const result = yield connect.query(sql, [id]);
                connect.release();
                console.log('result', result.rows);
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not find product ${id} `);
            }
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "UPDATE products SET sku=($2), description=($3),price=($4) WHERE id=($1)";
                const result = yield conn.query(sql, [params.id, params.sku, params.description, params.price]);
                conn.release();
                return true;
            }
            catch (error) {
                throw new Error(`Could not update product`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "DELETE FROM products WHERE id=($1)";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return true;
            }
            catch (error) {
                throw new Error(`Could not delete product ${id} `);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM products";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not connect products `);
            }
        });
    }
}
exports.productStore = productStore;
