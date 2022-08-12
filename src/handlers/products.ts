import { productStore } from "../models/products";
import express, { Request, Response } from "express";
const store = new productStore();
const create = async (req: Request, res: Response) => {
  const product = {
    sku: req.body.sku,
    description: req.body.description,
    price: req.body.price,
  };
  const productRes = await store.create(product);
  res.json(productRes);
};
const show = async (req: Request, res: Response) => {
  const productRes = await store.show(req.body.id);
  res.json(productRes);
};
const index = async (req: Request, res: Response) => {
  const productRes = await store.index();
  res.json(productRes);
};
const deleteProduct = async (req: Request, res: Response) => {
  const productRes = await store.delete(req.body.id);
  res.json(productRes);
};
const products_route = (app: express.Application) => {
  app.get("/product", index);
  app.post("/product", create);
  app.delete("/product/:id", deleteProduct);
  app.get("/product/:id", show);
};
