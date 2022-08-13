import { orderStore } from "../models/orders";
import { productStore } from "../models/products";

const store = new orderStore();
describe("orders model", () => {
  it("should have index", () => {
    expect(store.index).toBeDefined();
  });
  it("index should be list ", async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

});