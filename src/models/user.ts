import client from "../database";
const bcrypt = require("bcrypt");
const pepper = require("s-salt-pepper");
export type User = {
  id?: number;
  username: string;
  password: string;
};
export class userStory {
  async show(id: Number): Promise<User> {
    try {
      const conn = await client.connect();
      const sql = "SELECT * FROM book WHERE id=($1)";
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not find book ${id} . Error:${error}`);
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
  async create(u: User): Promise<User> {
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
      throw new Error(`Could not add new book ${u.username}`);
    }
  }
}
