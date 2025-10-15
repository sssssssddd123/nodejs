console.clear();
console.log('----------------[node start]----------------');

// data.js에 있는 객체를 가져옴 (import)
import { studentsAry } from './data.js';
// console.log(studentsAry);

// Array.prototype.reduce()
// reduce(function() { ... })
// -> 초깃값을 기준으로 어떤 작업을 할 것인지 만들어주는 함수

const evenAry = function (acc, elem, idx, ary) {
  console.log(`acc: ${acc}, elem: ${elem}`);
  if (idx % 2 == 0) {
    // 1, 3, 5번째 위치에 있는 값들을 초깃값([])에 push해 줌
    acc.push(elem);
  }
  return acc;
};

const sumAry = (acc, elem) => {
  console.log(`acc: ${acc}, elem: ${elem}`);
  return acc + elem;
};

// let result = [1, 2, 3, 4, 5].reduce(evenAry, []);
// let result = [1, 2, 3, 4, 5].reduce(sumAry, 0);

// 배열 속의 최대값을 반환하는 reduce
// const MaxNum = (acc, elem) => (acc > elem ? acc : elem);
const MaxNum = (acc, elem) => (acc < elem ? acc : elem);

let result = [23, 11, 56, 33, 47].reduce(MaxNum);

// console.log(`최대값: ${result}`);
// console.log(`최소값: ${result}`);

// 60점 이상인 학생만 새로운 배열에 저장
result = studentsAry.reduce((acc, elem) => {
  if (elem.score >= 60) {
    acc.push(elem);
  }
  return acc;
}, []);

// console.table(result);

const numAry = [23, 12, 45, 87, 12, 45];

result = numAry.reduce(function (acc, elem) {
  if (!acc.includes(elem)) {
    acc.push(elem);
  }
  return acc;
}, []);
console.log(result);

console.log('-----------------[node end]-----------------');
//
