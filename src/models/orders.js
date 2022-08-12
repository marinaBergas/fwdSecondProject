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
exports.orderStore = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt = require("bcrypt");
const pepper = require("s-salt-pepper");
class orderStore {
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "INSERT INTO orders ( status,ordernum,user_id,details) VALUES ($1, $2, $3,$4) RETURNING *";
                const result = yield connect.query(sql, [
                    o.status,
                    o.ordernum,
                    o.user_id,
                    o.details
                ]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not add new order${o.ordernum} `);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM orders WHERE id=($1)";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`Could not find order ${id} `);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "DELETE FROM orders WHERE id=($1)";
                const result = yield connect.query(sql, [id]);
                connect.release();
                return true;
            }
            catch (error) {
                throw new Error(`Could not delete order ${id} `);
            }
        });
    }
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "SELECT * FROM orders";
                const result = yield connect.query(sql);
                connect.release();
                return result.rows;
            }
            catch (error) {
                throw new Error(`Could not connect orders `);
            }
        });
    }
    update(params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = "UPDATE orders SET status = ($2), ordernum=($3),user_id=($4),details=($5) WHERE id =($1)";
                const result = yield conn.query(sql, [params.id, params.status, params.ordernum, params.user_id, params.details]);
                conn.release();
                return true;
            }
            catch (error) {
                throw new Error(`Could not update order`);
            }
        });
    }
    ///product-order
    addProduct(order_product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const connect = yield database_1.default.connect();
                const sql = "INSERT INTO order_products( quantity,order_id,product_id) VALUES($1, $2, $3) RETURNING *";
                const result = yield connect.query(sql, [order_product.quantity, order_product.order_id, order_product.product_id]);
                connect.release();
                return result.rows[0];
            }
            catch (error) {
                throw new Error(`could not add new order_product`);
            }
        });
    }
}
exports.orderStore = orderStore;
