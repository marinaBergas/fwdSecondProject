import { productStore } from "../models/products";
import express, { Request, Response } from "express";
const store = new productStore();
const create = async (req: Request, res: Response) => {
  const product = {
    sku: req.body.sku,
    description: req.body.description,
    price: req.body.price,
  };
  try {
    const productRes = await store.create(product);
    res.json(productRes);
  } catch (error) {
    res.json({ error: "can not add product" });
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const productRes = await store.show(req.params.id);
    res.json(productRes);
  } catch (error) {
    res.json({ error: "can not show product" });
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const productRes = await store.index();
    res.json(productRes);
  } catch (error) {
    res.json({ error: "can not show products" });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productRes = await store.delete(req.params.id);
    res.json(productRes);
  } catch (error) {
    res.json({ error: "can not delete product" });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  const product = {
    id: req.params.id,
    sku: req.body.sku,
    description: req.body.description,
    price: req.body.price,
  };
  try {
    const userUpdate = await store.update(product);
    res.json("product updated successfully");
  } catch (error) {
    res.json({ error: "can not update product" });
  }
};
const products_route = (app: express.Application) => {
  app.get("/product", index);
  app.post("/product", create);
  app.delete("/product/:id", deleteProduct);
  app.get("/product/:id", show);
  app.put("/product/:id", updateProduct);
};
export default products_route;
