import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
  BCRYPT_PASSWORD,
SALT_ROUNDS,
TOKEN_SECRET
} = process.env;
console.log(ENV);
let client: any;
if (ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    database:POSTGRES_TEST_DB,
    password: POSTGRES_PASSWORD,
      });
}
if (ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
