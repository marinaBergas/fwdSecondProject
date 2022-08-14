import express, { Request, Response } from "express";
import { userStory } from "../models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
const bcrypt = require("bcrypt");

dotenv.config();

const store = new userStory();
const create = async (_req: Request, res: Response) => {
  try {
    const userS = {
      username: _req.body.username,
      password_digest: _req.body.password_digest,
      email: _req.body.email,
    };
    const user = await store.create(userS);
    let token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
    res.json({ "user-token": token });
    res.end();
  } catch (error) {
    res.json({ error: "can not add user" });
    res.status(401);
  }
};
const updateUser = async (_req: Request, res: Response) => {
  const user = {
    id: _req.params.id,
    username: _req.body.username,
    password_digest: _req.body.password_digest,
    email: _req.body.email,
  };
  try {
    const userUpdate = await store.update(user);
    res.json("user updated successfully");
  } catch (error) {
    res.json({ error: "can not update user" });
    res.status(401);
  }
};
const login = async (_req: Request, res: Response) => {
  const user={
    id: _req.params.id,
    username: _req.body.username,
    password_digest: _req.body.password_digest,
    email: _req.body.email,
  }

  try {
    console.log('try');
    const userRes = await store.authenticate(user);
    res.json(userRes);
  } catch (error) {
    res.json("can not auth user");
    res.status(401);
  }
};

const verifyAuthToken = (req: Request, res: Response, next: any) => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    const token = authorizationHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (error) {
    res.json({ error: "user not authenticate" });

    res.status(401);
  }
};

const show = async (req: Request, res: Response) => {
  const authorizationHeader = req.headers.authorization as string;
  const token = authorizationHeader.split(" ")[1];
  const decoded = jwt.verify(
    token,
    process.env.TOKEN_SECRET as string
  ) as JwtPayload;
  const user_id = parseInt(req.params.id);
  console.log("decoded", decoded.user.id, user_id);
  try {
    if (user_id !== decoded.user.id) {
      res.json("the user token is incorrect");
    } else {
      const user = await store.show(req.params.id);
      res.json(user);
    }
  } catch (error) {
    res.json({ error: "can not show the user" });
    res.status(401);
  }
};
const index = async (req: Request, res: Response) => {
  try {
    const user = await store.index();
    res.json(user);
  } catch (error) {
    res.json({ error: "can not show users" });
    res.status(401);
  }
};
const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await store.delete(req.params.id);
    res.json("user deleted successfully");
  } catch (error) {
    res.json({ error: "can not delete user" });
    res.status(401);
  }
};
const users_route = (app: express.Application) => {
  app.get("/users", verifyAuthToken, index);
  app.get("/users/:id", verifyAuthToken, show);
  
  app.put("/users/:id", verifyAuthToken, updateUser);
  app.post("/users", create);
  app.get("/users/:id/auth", verifyAuthToken, login);
  app.delete("/users/:id", verifyAuthToken, deleteUser);
};
export default users_route;
