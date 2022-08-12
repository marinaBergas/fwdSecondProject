import client from "../database";
export type Order = {
  id?: number;
  status: string;
  orderNum: number;
  user_id: number;
  details: string;
};
export class orderStore {
  async create(o: Order): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql =
        "INSERT INTO orders ( status,orderNum,user_id,details)VALUES($1, $2, $3) RETURNING *";
      const result = await connect.query(sql, [
        o.status,
        o.orderNum,
        o.user_id,
        o.details,
      ]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add new order${o.orderNum} `);
    }
  }
  async show(id: number): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql = "SELECT * FROM orders WHERE id=($(1)";
      const result = await connect.query(sql, [id]);

      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find order ${id} `);
    }
  }
  async delete(id: number): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql = "DELETE FROM orders WHERE id=($1)";
      const result = await connect.query(sql, [id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete order ${id} `);
    }
  }
  async index(): Promise<Order> {
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
  async addProduct(
    quantity: number,
    order_id: string,
    product_id: string
  ): Promise<Order> {
    try {
      const connect = await client.connect();
      const sql =
        "INSERT INTO order_products( quantity,order_id,product_id) VALUES($1, $2, $3) RETURNING *";
      const result = await connect.query(sql, [quantity, order_id, product_id]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add new order_products`);
    }
  }
}
