import client from "../database";
export type Product = {
  id?: number;
  sku: string;
  description: string;
  price: number;
};
export class productStore {
  async create(p: Product): Promise<Product> {
    try {
      const connect = await client.connect();
      const sql =
        "INSERT INTO products (sku,description,price)VALUES($1, $2, $3) RETURNING *";
      const result = await connect.query(sql, [p.sku, p.description, p.price]);
      connect.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`could not add new product${p.sku} `);
    }
  }
  async show(id: string): Promise<Product> {
    try {
      const connect = await client.connect();
      const sql = "SELECT * FROM products WHERE id=($1)";
      const result = await connect.query(sql, [id]);

      connect.release();
      console.log('result',result.rows);
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find product ${id} `);
    }
  }
  async update(params: {
    id: string;
    sku: string;
    description: string;
    price: number;
  }): Promise<boolean> {

    try {
      const conn = await client.connect();
      const sql =
        "UPDATE products SET sku=($2), description=($3),price=($4) WHERE id=($1)";
      const result = await conn.query(sql, [params.id, params.sku, params.description,params.price]);
      conn.release();
      return true;
    } catch (error) {
      throw new Error(`Could not update product`);
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const connect = await client.connect();
      const sql = "DELETE FROM products WHERE id=($1)";
      const result = await connect.query(sql, [id]);
      connect.release();
      return true;
    } catch (error) {
      throw new Error(`Could not delete product ${id} `);
    }
  }

  async index(): Promise<Product[]> {
    try {
      const connect = await client.connect();
      const sql = "SELECT * FROM products";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not connect products `);
    }
  }
}
