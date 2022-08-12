"use strict";
// const concat = (str1: string, str2: string): string =>{
//     return str1 + str2;
// };
Object.defineProperty(exports, "__esModule", { value: true });
// const capitalize = (str: string): string => {
//     const newStr = str.split(' ')
//     .map(word => word[0].toUpperCase() + word.substr(1))
//     .join(' ');
//     return newStr;
// };
// const upperCase = (str: string): string => {
//     return str.toUpperCase();
// };
// const lowerCase = (str: string): string => {
//     return str.toLowerCase();
// };
// export default {
//     concat,
//     capitalize,
//     upperCase,
//     lowerCase
//   };
const concat = (str1, str2) => {
    return str1 + str2;
};
const capitalize = (str) => {
    const newStr = str.split(' ')
        .map(word => word[0].toUpperCase() + word.substr(1))
        .join(' ');
    return newStr;
};
const upperCase = (str) => {
    return str.toUpperCase();
};
const lowerCase = (str) => {
    return str.toLowerCase();
};
exports.default = {
    concat,
    capitalize,
    upperCase,
    lowerCase
};
