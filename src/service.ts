import  { Request, Response } from "express";
// import books_route from "./handlers/book";
// import users_route from "./handlers/user";

var express = require('express');
var bodyParser = require('body-parser');

var app = express();
const address: string = "0.0.0.0:3001";
const port = 3001;


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.post("/", function (req:any, res: any) {
  res.send("Hello WORLD");
});

// books_route(app);
// users_route(app);

app.listen(port, function() {
  console.log(`starting app on : ${address}`);
});

