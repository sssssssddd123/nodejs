console.clear();
console.log('--------------------------[node start]--------------------------');
// promise.js

// pending / fulfilled / rejected, then() / catch()

const promise = new Promise(function (resolve, reject) {
  // 성공 -> 첫 번째 매개 값으로 받은 함수를 호출
  // 실패 -> 두 번째 매개 값으로 받은 함수를 호출
  try {
    // console.logs('test');
    setTimeout(function () {
      resolve({ retCode: 'Success', retVal: ['hong', 'kim', 'park'] });
    }, 1000);
  } catch (err) {
    reject(new Error('[ Error ! ! ! ]'));
  }
});

promise
  .then(function (response) {
    console.log('Promise test');
    console.log(response);
  })
  .catch(function (err) {
    console.log(err);
  });

// console.log('---------------------------[node end]---------------------------');
