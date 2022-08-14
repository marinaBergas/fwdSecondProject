import  { Request, Response } from "express";
import users_route from "./handlers/user";
import  products_route from'./handlers/products';
import order_route from "./handlers/orders";
import { env } from "process";
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const address: string = "0.0.0.0:3001";
const port = process.env.PORT;

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post("/", function (req:any, res: any) {
  res.send("Hello WORLD");
});

users_route(app);
products_route(app);
order_route(app)
app.listen(port, function() {
  console.log(`starting app on : ${address}`);
});

