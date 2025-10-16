console.log('----------------[node start]----------------');
// Array.prototype.sort();
// -> sort()는 배열 속의 데이터를 오름차순으로 정렬해 줌

'abc'.split('').sort();
// -> ['a', 'b', 'c'].sort();

let fruits = ['banana', 'apple', 'mango'];

let points = [2, 14, 10, 100, 1];
points.sort(function (a, b) {
  // 오름차순: - 값을 반환
  // 내림차순: + 값을 반환
  // return a - b;
  if (a > b) {
    return 1;
  } else {
    return -1;
  }
});

const students = [];
students.push(
  { sno: 1, sname: '홍길동', score: 78 },
  { sno: 2, sname: '김찬성', score: 55 },
  { sno: 3, sname: '박인규', score: 95 }
);

students.sort(function (a, b) {
  // score를 오름차순으로 정렬(낮은 값 우선으로 정렬)
  if (a.score < b.score) return -1;
  return 1;
});

// filter(function(요소, 인덱스, 배열) {})
// -> 조건에 맞는 값을 찾아줌
let result = students.filter((elem) => elem.score < 80);
// -> elem(엘리먼트)는 배열 요소를 뜻함

// map(function)
// -> 조건에 맞는 값을 바꿔줌
result = students.map((elem) => {
  const obj = {};
  obj.no = elem.sno;
  obj.name = elem.sname;
  obj.score = elem.score >= 60 ? 'P' : 'F';
  return obj;
});
console.log('-----------------[node end]-----------------');
