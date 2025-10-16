console.clear();
console.log('--------------------------[node start]--------------------------');
// timer.js
// setTimeout(), setInterval()

setTimeout(() => {
  console.log('한 번만 실행');
}, 1000);

let job = setInterval(() => {
  console.log('반복 실행');
}, 1000);
