import supertest from "supertest";
import app from "../service";

const request = supertest(app);
describe("Test endpoint responses", () => {
  it("gets the api endpoint", async () => {
    const response = await request.post("/");
    expect(response.status).toBe(200);
  });
});
////users
describe("Test endpoint user", () => {
  it("get the api endpoint for users", async () => {
    const response = await request.get("/users");
    expect(response.status).toBe(200);
  });
  it("post the api endpoint for users", async () => {
    const response = await request.post("/users");
    expect(response.status).toBe(200);
  });
  it("put the api endpoint for users", async () => {
    const response = await request.put("/users/32");
    expect(response.status).toBe(200);
  });
  it("delete the api endpoint for users", async () => {
    const response = await request.delete("/users/32");
    expect(response.status).toBe(200);
  });
});
//products
describe("Test endpoint products", () => {
  it("get the api endpoint for products", async () => {
    const response = await request.get("/product");
    expect(response.status).toBe(200);
  });
  it("post the api endpoint for products", async () => {
    const response = await request.post("/product");
    expect(response.status).toBe(200);
  });
  it("put the api endpoint for products", async () => {
    const response = await request.put("/product/2");
    expect(response.status).toBe(200);
  });
  it("delete the api endpoint for products", async () => {
    const response = await request.delete("/product/2");
    expect(response.status).toBe(200);
  });
});
//orders
describe("Test endpoint orders", () => {
    it("get the api endpoint for orders", async () => {
      const response = await request.get("/order");
      expect(response.status).toBe(200);
    });
    it("post the api endpoint for orders", async () => {
      const response = await request.post("/order");
      expect(response.status).toBe(200);
    });
    it("put the api endpoint for orders", async () => {
      const response = await request.put("/order/2");
      expect(response.status).toBe(200);
    });
    it("delete the api endpoint for orders", async () => {
      const response = await request.delete("/order/2");
      expect(response.status).toBe(200);
    });
  });