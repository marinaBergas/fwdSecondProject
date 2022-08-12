import client from "../database";
const bcrypt = require("bcrypt");
const pepper = require("s-salt-pepper");
export type User = {
  id?: number;
  username: string;
  password: string;
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
    password: string;
  }): Promise<boolean> {
    try {
      const conn = await client.connect();
      const sql =
        "UPDATE users SET username = ($2), password_digest=($3) WHERE id =($1)";
      const saltRounds = bcrypt.genSaltSync(10);

      const hash = bcrypt.hashSync(
        params.password + pepper,
        parseInt(saltRounds)
      );

      const result = await conn.query(sql, [params.id, params.username, hash]);
      conn.release();
      return true;
    } catch (error) {
      throw new Error(`Could not update user`);
    }
  }
  async authenticate(username: string, password: string): Promise<User | null> {
    console.log("username", password);
    const conn = await client.connect();
    const sql = "SELECT password_digest FROM users WHERE username=($1)";
    const result = await conn.query(sql, [username]);
    if (result.rows.length) {
      const user = result.rows[0];

      if (bcrypt.compare(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null;
  }
  async create(u: User): Promise<User | null> {
    try {
      const conn = await client.connect();

      const sql =
        "INSERT INTO users (username, password_digest) VALUES($1, $2) RETURNING *";
      const saltRounds = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(saltRounds));
      const result = await conn.query(sql, [u.username, hash]);

      conn.release();
      const user = result.rows[0];
      return user;
    } catch (error) {
      throw new Error(`Could not add new user ${u.username}`);
    }
  }
  async index(): Promise<User> {
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
      console.log("row", result.rows);
      // return result.rows[0];
    } catch (error) {
      throw new Error(`Could not delete this user `);
    }
  }
}
