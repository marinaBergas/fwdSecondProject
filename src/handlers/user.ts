import express, { Request, Response } from "express";
import { userStory } from "../models/user";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const store = new userStory();
const create = async (_req: Request, res: Response) => {
    const userS = {
        username : _req.body.username,
        password :_req.body.password_digest,
    };
    const user = await store.create(userS);
    let token =jwt.sign({user},process.env.TOKEN_SECRET as string);
    res.json(token);
    res.end();
  };
  const authenticate= async(req: Request, res: Response)=>{
    const user = await store.authenticate(req.body.username,req.body.password);
    res.json(user);

  }
  const verifyAuthToken = (req: Request, res: Response, next:any) => {
    try {
        const authorizationHeader = req.headers.authorization  as string;
        const token = authorizationHeader.split(' ')[1]
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string)
  
        next()
    } catch (error) {
        res.status(401)
    }
  }
  const users_route = (app: express.Application) => {
     app.post("/users",create)
    app.post("/users/auth",verifyAuthToken,authenticate)

  };
  export default users_route;