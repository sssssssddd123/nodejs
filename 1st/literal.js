console.clear();
console.log('----------------[node start]----------------');
// literal.js
import { getStudentInfo } from './data.js';

let myName = '홍길동';

console.log('Hello, ' + myName);
// console.log(`Hello, ${myName}`);

let n1 = 10;
let n2 = 11;
// console.log(`n1 + n2 = ${n1 + n2}`);

// console.log(
//   `${getStudentInfo()
//     .map((person) => '친구 이름 => ' + person)
//     .join('\n')}`
// );

let friends = ['김민규', '박철중'];
// console.log(...friends);

let newAry = [...friends, ...getStudentInfo()];
// console.log(newAry);

// Object Destructuring
const person = {
  firstName: 'Kildong',
  lastName: 'Hong',
  age: 20,
};
// let firstName = person.firstName;
let { firstName: fn, lastName: ln, age } = person;
// console.log(fn, ln, age);

// Array Destructuring
let [ary1, ary2, ...ary3] = getStudentInfo();
// console.log(ary1, ary2, ary3);

// default function parameter
function minus(n1 = 0, n2 = 0) {
  return n1 - n2;
}
console.log(minus(1, 2));

console.log('-----------------[node end]-----------------');
