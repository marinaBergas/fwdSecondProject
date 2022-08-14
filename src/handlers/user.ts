import express, { Request, Response } from "express";
import { userStory } from "../models/user";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const store = new userStory();
const create = async (_req: Request, res: Response) => {
  try {
    const userS = {
      username: _req.body.username,
      password_digest: _req.body.password_digest,
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
const updateUser=async (_req: Request, res: Response)=>{
  const user={
    id:_req.params.id,
    username: _req.body.username,
    password: _req.body.password_digest
  }
   try {
    const userUpdate= await store.update(user);
    res.json('user updated successfully');
   } catch (error) {
    res.json({ error: "can not update user" });
    res.status(401);
   }


}
const authenticate = async (req: Request, res: Response) => {
  try {
    const user = await store.authenticate(req.body.username, req.body.password);
    res.json(user);
  } catch (error) {
    res.json( error );
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
    res.json({ error: "user is not authenticate" });

    res.status(401);
  }
};
const show = async (req: Request, res: Response) => {
  try {
    const user= await store.show(req.params.id);
    res.json(user);
  } catch (error) {
    res.json({ error:'can not show the user' });
    res.status(401);
  }

};
const index = async (req: Request, res: Response) => {
  try {
    const user = await store.index();
    res.json(user);
  } catch (error) {
    res.json({ error:'can not show users' });
    res.status(401);
  }

};
const deleteUser=async (req: Request, res: Response) => {
  try {
    const deletedUser=await store.delete(req.params.id);
    res.json('user deleted successfully');
  } catch (error) {
    res.json({ error:'can not delete user' });
    res.status(401);
  }


}
const users_route = (app: express.Application) => {
  app.get('/users', index)
  app.get("/users/:id",show);
  app.put("/users/:id",updateUser);
  app.post("/users", create);
  app.post("/users/auth", verifyAuthToken, authenticate);
  app.delete("/users/:id",deleteUser)
};
export default users_route;
