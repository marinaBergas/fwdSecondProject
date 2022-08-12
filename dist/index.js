"use strict";
// "use strict";
// // NOTE: This code has not been converted to TypeScript yet
// const arrays = require('./utilities/arrays.ts');
// const numbers = require('./utilities/numbers.ts');
// const strings = require('./utilities/strings.ts');
// const numArr = [3, 4, 5, 6];
// const wordArr = ['cat', 'dog', 'rabbit', 'bird'];
// const arrSum = arrays.addArr(numArr);
// const mixArr = arrays.concatArr(numArr, wordArr);
// const myNum = '15' % 2;
// // results of function calls
// console.log(arrays.cut3(mixArr));
// console.log(numbers.sum(arrSum, myNum));
// console.log(strings.capitalize('the quick brown fox'));
// console.log(numbers.multiply('5', 8));
// console.log(arrays.lgNum(mixArr));
// const myFunc=(num:number):number=>num*5;
// export default myFunc;
// import arrays from './utilities/arrays';
// import numbers from './utilities/numbers';
// import strings from './utilities/strings';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
// const numArr = [3, 4, 5, 6];
// const wordArr = ['cat', 'dog', 'rabbit', 'bird'];
// const arrSum = arrays.addArr(numArr);
// const mixArr = arrays.concatArr(numArr, wordArr);
// const myNum = ('15' as unknown) as number % 2;
// const five = parseInt('5');
// console.log(arrays.cut3(mixArr));
// console.log(numbers.sum(arrSum, myNum));
// console.log(strings.capitalize('the quick brown fox'));
// console.log(numbers.multiply(five, 8));
// console.log(arrays.lgNum(mixArr));
/** Use Axios to get data from restcountries api */
/** Use the free API https://restcountries.eu/
 * You will use the following endpoints
 * https://restcountries.eu/rest/v2/name/{name} for countries by name
 * https://restcountries.eu/rest/v2/regionalbloc/{regionalbloc} for region blocks
 */
/** Create getCountry Function here */
// async function getCountry(name: string) {
//   const getApi = await axios(`https://restcountries.eu/rest/v2/name/${name}`);
//   const data = getApi.data[0];
//   return {
//     capital: data.capital,
//     region:  data.region,
//     numericCode:  data.numericCode,
//   };
// }
/** Create a test for this getRegion function */
// async function getRegionCountries(regionalbloc: string) {
//   const getApi = await axios(
//     `https://restcountries.eu/rest/v2/regionalbloc/${regionalbloc}`
//   );
//   const data = getApi.data;
//   const countries = [];
//   for (let i = 0; i < data.length; i++) {
//     countries.push(data[i].name);
//   }
//   return countries;
// }
/** Create getRegionCapitals function here */
// async function getRegionCapitals(regionalbloc: string) {}
// getCountry("canada");
// export default {
//   getCountry,
//   getRegionCountries,
//   getRegionCapitals,
// };
//end point
var express_1 = __importDefault(require("express"));
var app = (0, express_1["default"])();
var port = 5000;
app.get('/api', function (req, res) {
    res.send("hello,world");
});
app.listen(port, function () { return console.log("listening on port ".concat(port)); });
exports["default"] = app;
// import arrays from './utilities/arrays';
// import numbers from './utilities/numbers.js';
// import strings from './utilities/strings.js';
// const numArr = [3, 4, 5, 6];
// const wordArr = ['cat', 'dog', 'rabbit', 'bird'];
// const arrSum = arrays.addArr(numArr);
// const mixArr = arrays.concatArr(numArr, wordArr);
// const myNum = ('15' as unknown) as number % 2;
// const five = parseInt('5');
// const newArr = (num: number, arr:(string|number)[]): (string|number)[]=> {
//     return [num, ...arr];
// }
// console.log(newArr(3, wordArr));
// console.log(arrays.cut3(mixArr));
// console.log(numbers.sum(arrSum, myNum));
// console.log(strings.capitalize('the quick brown fox'));
// console.log(numbers.multiply(five, 8));
// console.log(arrays.lgNum(mixArr));
// export default newArr;
// import axios from "axios";
// import express from "express";
// import { appendFile } from "fs";
// import routes from "./routes";
// import teachers from "./routes/api/teachers";
// import students from "./routes/api/students";
// import logger from "./logged/logger";
// const app = express();
// const port = 3000;
// const inputFile = "./user.csv";
// const imageSrc = '/home/oie/fwd/eslint/src/assets/favicon.png';
// const output = "user.json";
// import csv from "csvtojson";
// // import { parseInt } from "lodash";
// const fs=require('fs');
// const fsPromises = require('fs').promises;
// const sharp = require('sharp');
//const url = `http://website.com/books?title=express`;
// app.get('/',(req,res)=>{
// // console.log(req.query.title);
// res.send('server on work new mm');
// });
// app.use('/api',routes);
// app.use('/',students,teachers);
// app.use('/teachers',teachers);
// app.get('/contentials',logger,(req,res)=>{
//     res.send('contentials is working')
// });
// app.get('/countries',logger,(req,res)=>{
//     res.send('countries is working')
// });
// app.get('/oceans',(req,res)=>{
//     res.send('oceans is working title')
// });
// app.get("/convert/:width?", (req, res) => {
//  const image=res.sendFile(imageSrc);
// console.log('image',`<image src=${imageSrc} width='250'/>`)
//   csv()
//     .fromFile(inputFile)
//     .then((data) => {
//       let newData = data.map(
//         (item: { first_name: string; last_name: string; phone: string }) => {
//           let firstName = item.first_name;
//           let lastName = item.last_name;
//           let phone = item.phone;
//           if (item.phone === "") {
//             phone = "phone is missing";
//           }
//           return{firstName,lastName,phone};
//         }
//       );
//       fsPromises.writeFile(output,JSON.stringify(newData))
//       console.log("data", data);
//     });
// });
// app.param('width', (req, res, next, id) => {
//   console.log('CALLED ONLY ONCE')
//   next()
// })
// app.get("/convert/:width?:height?", (req:express.Request, res:express.Response) => {
//    const image=res.sendFile(imageSrc);
//    let width:string=req.query.width as string;
//       let height:string=req.query.height as string;
//    sharp(imageSrc)
//    .resize(parseInt(width), parseInt(height))
//    .toFile(`image-${width}.png`, (error:unknown, info:unknown) => { 
//      console.log(error,info);
//    });
//   console.log('query',width);
//   });
// app.listen(port, () => {
//   console.log(`listening on http://localhost:${port}`);
// });
