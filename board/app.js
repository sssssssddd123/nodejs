// 과제: board 서버 프로그램 생성

// 모듈 선언
const express = require('express');
const cors = require('cors');
const mysql = require('./sql/index');

// 라우트 경로 지정
const boardsRouter = require('./routes/boards');

// express 인스턴스 생성
const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));

// 라우팅
app.use('/', boardsRouter);

// 서버 가동
app.listen(3000, '0.0.0.0', () => {
  console.log('[ board Test server 가동 완료 | Port: 3000 ]');
});
