import { productStore } from "../models/products";
export type Product = {
  id?: number;
  sku: string;
  description: string;
  price: number;
};
const store = new productStore();
describe("products model", () => {
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
  it('fetch all products', async function () {
    const product:Product = {
      id:2,
      sku:"this is aproduct #12",
      description:"123456",
      price:25
    }
    await store.create(product)
    const userList = await store.index()

  expect(userList.length).toBeGreaterThan(0);});
  it("update should be not be undefined ", async () => {
    expect(store.update).toBeDefined();
  });
  it("delete should return true ", async () => {
    const result=await store.delete("42");
    expect(result).toBe(true);
  });
  it("update should return true ", async () => {
    const product = {
      id:"2",
      sku:"this is aproduct #12",
      description:"123456",
      price:25

    }
   const result=await store.update(product);
    expect(result).toBe(true);
  });
});