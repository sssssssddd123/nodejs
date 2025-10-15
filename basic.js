console.log('----------------[node start]----------------');

/*
let times = 3;

for (let i = 1; i < times; i++) {
  console.log(i);
}

{
  let times = 4;
  console.log(times);
}

console.log(times);

const obj = {};
// obj = { age: 10 };
obj.age = 10;

console.log(obj);
*/

// 일반 함수
// function sum(n1 = 0, n2 = 0) {
//   return n1 + n2;
// }

// 화살표 함수
const sum = (n1 = 0, n2 = 0) => n1 + n2;

console.log(`sum(1, 2)의 결과는 ${sum(1, 2)}입니다.`);

console.log('-----------------[node end]-----------------');
//
