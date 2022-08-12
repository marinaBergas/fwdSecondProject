"use strict";
// // Concatenate two arrays
Object.defineProperty(exports, "__esModule", { value: true });
// const concatArr = (arr1: (string | number)[], arr2: (string | number)[]):(string | number)[] => {
//     return [...arr1, ...arr2];
//   };
//   // Add numbers in an array
//   const addArr = (arr: number[]): number => {
//     let total = 0;
//     arr.forEach((x) => {
//       total += x;
//     });
//     return total;
//   };
//   // Find the largest number in an array
//   const lgNum = (arr: (string | number)[]): number => {
//     let largest = 0 as number;
//     arr.forEach((x) => {
//       if (x > largest) {
//         largest = x as number;
//       }
//     });
//     return largest;
//   };
//   // Remove the 3rd item from an array
//   const cut3 = (arr: (string|number)[]):(string | number)[] => {
//     arr.splice(2, 1);
//     return arr;
//   };
//   export = {
//     concatArr,
//     addArr,
//     lgNum,
//     cut3
//   }
// Concatenate two arrays
const concatArr = (arr1, arr2) => {
    return [...arr1, ...arr2];
};
// Add numbers in an array
const addArr = (arr) => {
    let total = 0;
    arr.forEach((x) => {
        total += x;
    });
    return total;
};
// Find the largest number in an array
const lgNum = (arr) => {
    let largest = 0;
    arr.forEach((x) => {
        if (x > largest) {
            largest = x;
        }
    });
    return largest;
};
// Remove the 3rd item from an array
const cut3 = (arr) => {
    arr.splice(2, 1);
    return arr;
};
exports.default = {
    concatArr,
    addArr,
    lgNum,
    cut3
};
