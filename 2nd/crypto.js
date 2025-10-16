console.clear();
console.log('--------------------------[node start]--------------------------');
const { rejects } = require('assert');
const crypto = require('crypto');

let cryptPasswd = crypto.createHash('sha256').update('sample123').digest('hex');

// console.log(cryptPasswd);

// DB의 값을 암호화한 값 vs 사용자가 입력한 값을 암화한 값
// -> 서로 비교 후 판별

// salting 임의의 구문 -> 동일한 평문(비밀번호) -> 다른 암호값
let fixedSalt =
  'Rzqtnm5r565xIZn8tORorWjhNAeKpByV80RWNYuEWkNkm2G86gJ57yrWTGfCu3+K1mzf0yPpLm5QMsizaRJ0Bg==';
function getCryptoPasswd(password) {
  return new Promise((resolve, reject) => {
    // let salt = crypto.randomBytes(64).toString('base64');
    let dbPass =
      'FdQWfp4rgG4I7ASKtFLQ4c/oKkwfdZJ+rKujnHdXPVDY+yl0kkTrwH243CxIIxv/uHAIxS+a0s/AMDIjJ3v/dA==';
    // console.log(fixedSalt);
    crypto.pbkdf2(password, fixedSalt, 100000, 64, 'sha512', (err, key) => {
      if (err) {
        console.error(err);
        return;
      }
      // console.log(key.toString('base64'));
      resolve(dbPass == key.toString('base64') ? '[ same ]' : '[ different ]');
    });
  });
}

// pw: sample1234
getCryptoPasswd('test123')
  .then((data) => {
    console.log(data);
  })
  .catch((err) => {
    console.log(err);
  });
