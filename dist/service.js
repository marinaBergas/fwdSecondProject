"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var book_1 = __importDefault(require("./handlers/book"));
var user_1 = __importDefault(require("./handlers/user"));
// import users from "./handlers/user";
// import users from "./models/user";
// import cors from 'cors';
var app = (0, express_1["default"])();
var address = "0.0.0.0:3001";
var port = 3001;
var cors = require("cors");
var corsOptions = {
    origin: "http://someotherdomain.com",
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(body_parser_1["default"].json());
app.get("/", function (req, res, next) {
    res.send("Hello WORLD");
});
// app.get("/test-cors", cors(corsOptions), function(req, res, next) {
//   // res.send("Hello WORLD");
//   res.json({ msg: "This is CORS-enabled for a Single Route" });
// });
(0, book_1["default"])(app);
(0, user_1["default"])(app);
app.listen(port, function () {
    console.log("starting app on : ".concat(address));
});
// app.get("/article", (_req: Request, res: Response) => {
//   try {
//     res.send("this is the index route");
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// });
// app.get('/articles/:id',(_req: Request, res: Response) => {
//   try {
//     res.send("this is show route");
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// });
// app.post('/articles/',(req: Request, res: Response) => {
//   const article = {
//     title: req.body.title,
//     content: req.body.content
//   }
//   try {
//     res.send("this is CREAT route");
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// });
// app.put('/articles/:id',(req: Request, res: Response) => {
//   const article = {
//     id:req.params.id,
//     title: req.body.title,
//     content: req.body.content
//   }
//   try {
//     res.send("this is EDIT route");
//   } catch (error) {
//     res.status(400);
//     res.json(error);
//   }
// });
// app.delete('/articles/:id',(_req:Request,res:Response)=>{
// try {
//   res.send('this is delete route')
// } catch (error) {
//   res.status(400);
//     res.json(error);
// }
// })
