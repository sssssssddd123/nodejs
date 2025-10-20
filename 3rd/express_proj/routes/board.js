const express = require('express');
const router = express.Router();

// '/board'
// get / post / put / delete를 한번에 관리
router
  .route('/')
  .get((req, res) => {
    res.send('board get');
  })
  .post((req, res) => {
    res.send('board post');
  })
  .put((req, res) => {
    res.send('board put');
  })
  .delete((req, res) => {
    res.send('board delete');
  });

module.exports = router;
