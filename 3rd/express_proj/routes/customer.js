const express = require('express');
const router = express.Router();

// 라우팅 처리
// '/' -> 고객 정보
// '/add' -> 고객 등록

router.get('/', (req, res) => {
  res.send('Customer Home Page');
});

router.post('/add', (req, res) => {
  console.log('[ Customer ]');
  console.log(req.body);
  res.send('Customer Added');
});

module.exports = router;
