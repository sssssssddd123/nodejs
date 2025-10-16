console.clear();
console.log('--------------------------[node start]--------------------------');
// timer.js
const fs = require('fs');
const process = require('process');
const os = require('os');

console.log(process.env.USERNAME);
// process.exit();
console.log(os.arch());
console.log(os.cpus());

// setTimeout() -> 한 번만 실행
// setInterval() -> 반복 실행
// clearInterval() -> 실행 종료
if (false) {
  setTimeout(() => {
    // console.log('한 번만 실행');
  }, 1000);

  fs.readFile('./sample.txt', 'utf-8', (err, data) => {
    let cnt = 0;
    let max = data.length;

    let job = setInterval(() => {
      console.clear();
      console.log(data.substring(0, cnt++));
      if (cnt == max) {
        clearInterval(job);
      }
    }, 20);
  });
}
