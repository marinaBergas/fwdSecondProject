import client from "../database";
import bcrypt from "bcrypt";
// const pepper = require("s-salt-pepper");
const pepper = process.env.BCRYPT_PASSWORD as string;
const saltRounds = process.env.SALT_ROUNDS as string;
export type User = {
  id?: string|number;
  username: string;
  password_digest: string;
  email: string;
};
export class userStory {
  async show(id: string): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM users WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find users ${id} . Error:${error}`);
    }
  }
  async update(params: {
    id: string;
    username: string;
    password_digest: string;
    email: string;
  }): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET username = ($2), password_digest=($3), email=($4) WHERE id =($1)";
      const hash = bcrypt.hashSync(
        params.password_digest + pepper,
        parseInt(saltRounds)
      );
      const result = await conn.query(sql, [params.id, params.username, hash,params.email]);
      conn.release();

      return true;
    } catch (error) {
      throw new Error(`Could not update user`);
    }
  }
  async authenticate(
   u:User
  ): Promise<User | string> {
    try {
      const conn = await client.connect();
      const sql = 'SELECT * FROM users WHERE id=($1)';
      const result = await conn.query(sql,[u.id]);
      conn.release();
      if (result.rows.length) {
        const user = result.rows[0];
        if (
          bcrypt.compareSync(u.password_digest + pepper, user.password_digest)
        ) {
          return user;
        } else {
          return "password isn not correct";
        }
      }
      return "there is some thing wrong";
    } catch (error) {
      throw new Error(`Could not authenticate`);
    }
  }
  async create(u: User): Promise<User > {
    try {
      const conn = await client.connect();

      const sql =
        "INSERT INTO users (username, password_digest,email) VALUES($1, $2,$3) RETURNING *";
      const hash = bcrypt.hashSync(
        u.password_digest + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [u.username,hash,u.email]);

      conn.release();
      const user = result.rows[0];
      return user;
    } catch (error) {
      throw new Error(`Could not add new user ${u.username}`);
    }
  }
  async index(): Promise<User[]> {
    try {
      const connect = await client.connect();
      const sql = "SELECT * FROM users";
      const result = await connect.query(sql);
      connect.release();
      return result.rows;
    } catch (error) {
      throw new Error(`Could not connect users `);
    }
  }
  async delete(id: string): Promise<boolean> {
    try {
      const connect = await client.connect();
      const sql = "DELETE FROM users WHERE id=($1);";
      const result = await connect.query(sql, [id]);
      connect.release();
      return true;
    } catch (error) {
      throw new Error(`Could not delete this user `);
    }
  }
}
