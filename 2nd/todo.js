console.clear();
console.log('--------------------------[node start]--------------------------');
// todo.js
const fs = require('fs');

const data = fs.readFileSync('sample.txt', 'utf-8');

// console.log(data);

// 1. sample.txt에 있는 단어의 개수
const test1 = data.split(' ');
console.log('1. sample.txt에 있는 단어의 개수');
console.log(test1.length);

// 2. 'e'문자가 포함된 단어의 개수
console.log("2. 'e'문자가 포함된 단어의 개수");
// let result = test1.reduce((acc, elem) => {
//   if (elem.includes('e')) acc.push(elem);
//   return acc;
// }, []);
// console.log(result.length);
const search = 'e';
let result = test1.reduce((acc, elem) => {
  let get = [];
}, {});
