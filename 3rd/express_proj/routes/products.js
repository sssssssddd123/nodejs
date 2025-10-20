const express = require('express');
const router = express.Router();

// 라우팅 처리
// '/' -> 상품 정보
// '/add' -> 상품 등록

router.get('/', (req, res) => {
  res.send('Products Home Page');
});

router.post('/add', (req, res) => {
  console.log('[ Product ]');
  console.log(req.body);
  res.send('Product Added');
});

module.exports = router;
