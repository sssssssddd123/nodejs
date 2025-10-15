console.clear();
console.log('----------------[node start]----------------');
import { jsonString } from './data.js';

const jsonObj = JSON.parse(jsonString);

// reduce 출력
// -> Female만 id, fullName, email, salary을 resultAry에 넣기
const resultAry = jsonObj.reduce((acc, elem) => {
  if (elem.gender == 'Female') {
    acc.push({
      id: elem.id,
      fullName: `${elem.first_name} ${elem.last_name}`,
      email: elem.email,
      gender: elem.gender,
      salary: elem.salary,
    });
  }
  return acc;
}, []);
console.table(resultAry);

console.log('-----------------[node end]-----------------');
