import { orderStore } from "../models/orders";
import { productStore } from "../models/products";
import { userStory } from "../models/user";
export type Order = {
  id?: string;
  status: string;
  ordernum: string;
  user_id: number;
  details: string;
};
const store = new orderStore();
const userStore = new userStory();
export type User = {
  id?: string | number|undefined;
  username: string;
  password_digest: string;
  email: string;
};
let userInfo:User;

describe("orders model", () => {
  beforeAll(async () => {
    const user = {
      username: "mar",
      password_digest: "123456",
      email: "marina.sber@gmail.com",
    };
     userInfo = await userStore.create(user);
    console.log("userRes", userInfo);
    const order: Order = {
      id: "1",
      status: "accepts",
      ordernum: "12",
      user_id: userInfo.id as number,
      details: "det",
    };
    const result = await store.create(order);
    // return result;
  });
  it("should have index", () => {
    expect(store.index).toBeDefined();
  });
  it("index should be list ", async () => {
    const result = await store.index();
    expect(result).not.toEqual([]);
  });
  it(" create should not be undefined ", async () => {
    expect(store.create).toBeDefined();
  });
  it("delete should be not be undefined ", async () => {
    expect(store.delete).toBeDefined();
  });
  it("update should be not be undefined ", async () => {
    expect(store.update).toBeDefined();
  });
  it("delete should return true ", async () => {
    const result = await store.delete("42");
    expect(result).toBe(true);
  });
  it("update should return true  ", async () => {
    const order = {
      id: "1",
      status: "accepts",
      ordernum: "12",
      user_id: userInfo.id as number,
      details: "det",
    };
    const result = await store.update(order);
    expect(result).toBe(true);
  });
});
