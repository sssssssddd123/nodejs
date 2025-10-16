console.clear();
console.log('--------------------------[node start]--------------------------');
// Console
// -> log를 만들어주는 클래스
const { Console } = require('console');
const fs = require('fs');

// fs.createWriteStream(파일명)
// -> 파일속에 로그를 만들어 줌
// -> { flags: 'a' }: 기존의 로그를 덮어쓰지 않고 추가로 작성해 줌
const output = fs.createWriteStream('./stdOut.log', { flags: 'a' }); // 일반적인 로그
const errOutput = fs.createWriteStream('./stdErr.log', { flags: 'a' }); // 에러 로그

const logger = new Console({ stdout: output, stderr: errOutput });

// log(): 로그 / 일반 로그
logger.log('[ Success ]\n');

// error(): 로그 / 에러 로그
logger.error('[ Error ! ! ! ]\n');
