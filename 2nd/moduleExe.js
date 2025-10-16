console.clear();
console.log('--------------------------[node start]--------------------------');
// moduleExe.js
const { PI, sum } = require('./module');
const fs = require('fs'); // node에서 자체적으로 갖고 있는 module / File System

// writeFile(제목, 내용, 타입) / 비동기 방식
if (false) {
  fs.writeFile('sample.txt', 'Hello, World', (err) => {
    if (err) {
      console.log(new Error(err));
    }
    console.log('[ Write File( 비동기 ) done ]');
  });
  // writeFileSync(제목, 내용, 타입) / 동기 방식
  // 한글이 들어가 있으니 타입은 'utf-8'으로 지정
  fs.writeFileSync('sample2.txt', '동기 작업 완료', 'utf-8');
  console.log('[ Write File Sync( 동기 ) done ]');
}

// 비동기 방식
fs.readFile('sample.txt', 'utf-8', (err, data) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log(data);
});

// 동기 방식
let data = fs.readFileSync('sample2.txt', 'utf-8');
console.log(data);

console.log(PI);
console.log(sum(1, 2));
