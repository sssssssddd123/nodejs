console.clear();
console.log('--------------------------[node start]--------------------------');
// setTimeout.js

// 10 + 2
// -> *2
// -> + 5
// -> 결과로 출력

// promise를 async, await 활용하여 작성
let result = 10;

function delayFunc(delay, operations) {
  return new Promise((resolve, reject) => {
    setTimeout(function () {
      operations();
      resolve(result);
    }, delay); // + 2
  });
}

async function runPromise() {
  try {
    await delayFunc(500, () => {
      result += 2;
    });
    console.log(result);

    await delayFunc(1000, () => {
      result *= 2;
    });
    console.log(result);

    await delayFunc(800, () => {
      result += 5;
    });
    console.log(result);
  } catch (err) {
    console.log(new Error('[ Error ! ! ! ]'));
  }
  console.log(
    '---------------------------[node end]---------------------------'
  );
} // runPromise End

runPromise();
