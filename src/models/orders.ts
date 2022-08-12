import client from "../database";
const bcrypt = require("bcrypt");
const pepper = require("s-salt-pepper");
export type Order = {
  id?: number;
  status: string;
  ordernum: number;
  user_id: number;
  details: string;
};
export type ProductOrder={
  quantity: number,
  order_id: string,
  product_id: string
}
export class orderStore {
  async create(o: Order): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql =
        "INSERT INTO orders ( status,ordernum,user_id,details) VALUES ($1, $2, $3,$4) RETURNING *";
      const result = await connect.query(sql, [
        o.status,
        o.ordernum,
        o.user_id,
        o.details
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add new order${o.ordernum} `);
    }
  }
  async show(id: string): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=($1)";
      const result = await connect.query(sql, [id]);

      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find order ${id} `);
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const connect = await client.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await connect.query(sql, [id]);
      connect.release();
      return true;
    } catch (error) {
      throw new Error(`Could not delete order ${id} `);
    }
  }
  async index(): Promise<Order[]> {
    try {
      const connect = await client.connect();
      const sql = "SELECT * FROM orders";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not connect orders `);
    }
  }
  async update(params: {
    id: string;
    status: string;
  ordernum: number;
  user_id: number;
  details: string;
  }): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE orders SET status = ($2), ordernum=($3),user_id=($4),details=($5) WHERE id =($1)";

      const result = await conn.query(sql, [params.id, params.status, params.ordernum,params.user_id,params.details]);
      conn.release();
      return true;
    } catch (error) {
      throw new Error(`Could not update order`);
    }
  }

  ///product-order
  async addProduct(
    order_product:ProductOrder
  ): Promise<ProductOrder> {
    try {
      const connect = await client.connect();
      const sql =
        "INSERT INTO order_products( quantity,order_id,product_id) VALUES($1, $2, $3) RETURNING *";
      const result = await connect.query(sql, [    order_product.quantity, order_product.order_id, order_product.product_id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add new order_product`);
    }
  }
}
