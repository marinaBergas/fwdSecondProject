import { orderStore } from "../models/orders";
import { productStore } from "../models/products";
export type Order = {
  id: string;
  status: string;
ordernum: number;
user_id: number;
details: string;
};
const store = new orderStore();
describe("orders model", () => {
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
    const result=await store.delete("42");
    expect(result).toBe(true);
  });
  it("update should return true ", async () => {
    const order:Order = {
      id: "1",
      status: "accepts",
      ordernum: 123,
      user_id: 32,
      details: "det"

    }
   const result=await store.update(order);
    expect(result).toBe(true);
  });
});