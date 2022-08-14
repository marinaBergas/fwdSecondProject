import { orderStore } from "../models/orders";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const store = new orderStore();
const create = async (req: Request, res: Response) => {
  const order = {
    status: req.body.status,
    ordernum: req.body.ordernum,
    user_id: req.body.user_id,
    details: req.body.details
  };
  try {
    const orderRes = await store.create(order);
    res.json(orderRes);
  } catch (error) {
    res.json({ error: "can not add order" });
    res.status(401);
  }

};
const show = async (_req: Request, res: Response) => {
  try {
    const orderRes = await store.show(_req.params.id);
    res.json(orderRes);
  } catch (error) {
    res.json({ error: "can not show order" });
    res.status(401);
  }

};
const index = async (_req: Request, res: Response) => {
  try {
    const orderRes = await store.index();
    res.json(orderRes);
  } catch (error) {
    res.json({ error: "can not show orders" });
    res.status(401);
  }

};
const deleteOrder = async (_req: Request, res: Response) => {
  try {
    const orderRes = await store.delete(_req.params.id);
    res.json(orderRes);
  } catch (error) {
    res.json({ error: "can not delete order" });
    res.status(401);
  }

};
const updateOrder=async (_req: Request, res: Response)=>{
    const order={
      id:_req.params.id,
      status: _req.body.status,
      ordernum: _req.body.ordernum,
      user_id: _req.body.user_id,
      details: _req.body.details
    }
     try {
      const userUpdate= await store.update(order);
      res.json('order updated successfully');
     } catch (error) {
      res.json({ error: "can not update order" });
      res.status(401);
     }

  
  }
  const orderProduct=async (_req: Request, res: Response)=>{
    const order_product={
        quantity: _req.body.quantity,
    order_id: _req.body.order_id,
    product_id: _req.body.product_id
    }
    try {
      const userUpdate= await store.addProduct(order_product)
      res.json('orderProduct add successfully');

    } catch (error) {
      res.json({ error: "can not add orderProduct" });
      res.status(401);
    }
  }
const verifyAuthToken = (req: Request, res: Response, next: any) => {
    try {
      const authorizationHeader = req.headers.authorization as string;
      const token = authorizationHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);
  
      next();
    } catch (error) {
      res.json({ error: "user is not authenticate" });
  
      res.status(401);
    }
  };
const order_route = (app: express.Application) => {
  app.get("/order",verifyAuthToken, index);
  app.post("/order",verifyAuthToken, create);
  app.delete("/order/:id",verifyAuthToken, deleteOrder);
  app.get("/order/:id",verifyAuthToken, show);
  app.put("/order/:id",verifyAuthToken,updateOrder);

  app.post("/addProduct",verifyAuthToken, orderProduct);

};
export default order_route;

