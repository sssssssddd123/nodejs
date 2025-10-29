const express = require('express');
const router = express.Router();
const mysql = require('../sql/index');

// 라우팅 처리
// .../boards/
// 목록
router.get('/', async (req, res) => {
  const sql = `select * from tbl_board`;
  const result = await mysql.queryExecute(sql);
  res.json(result);
  console.log('[ === boards home === ]');
});

// .../board/:id
// 조회
router.get('/:id', async (req, res) => {
  const sql = `select * from tbl_board where id = ?`;
  const param = [req.params.id];
  const post = await mysql.queryExecute(sql, param);

  const sql2 = `
  SELECT * FROM tbl_comment where board_id = ?`;
  const comments = await mysql.queryExecute(sql2, param);

  res.json({
    post: post[0],
    comments: comments,
  });
  console.log('[ === board get === ]');
});

// .../board/
// 등록
router.post('/', async (req, res) => {
  const sql = `
  INSERT INTO tbl_board (title, content, writer)
  VALUES("${req.body.title}", "${req.body.content}", "${req.body.writer}")`;
  const result = await mysql.queryExecute(sql);
  res.json(result);

  // const newSql = `
  // SELECT * FROM tbl_board WHERE id = ?`;
  // const resultId = result.insertId;
  // const newResult = await mysql.queryExecute(newSql, resultId);

  console.log('[ === board add === ]');
});

// .../board/addComment/
// 댓글 등록
router.post('/addComment/', async (req, res) => {
  const sql = `
  INSERT INTO tbl_comment (board_id, content, writer)
  VALUES (?, ?, ?)`;
  const params = [req.body.postId, req.body.comment, req.body.writer];
  const result = await mysql.queryExecute(sql, params);
  res.json(result);
  console.log('[ === comment add === ]');
});

// .../board/
// 수정
router.put('/', async (req, res) => {
  const sql = `
  UPDATE tbl_board
  SET title = "${req.body.title}", content = "${req.body.content}"
  WHERE id = ${req.body.id}`;
  const result = await mysql.queryExecute(sql);
  console.log('[ === board put === ]');
  res.send('board put');
});

// .../board/:id
// 삭제
router.delete('/:id', async (req, res) => {
  const sql = `
  delete from tbl_board
  where id = ${req.params.id}`;
  const result = await mysql.queryExecute(sql);
  console.log('[ === board delete === ]');
  res.send('board delete');
});

// .../login/
// 로그인
router.post('/login', async (req, res) => {
  const sql = `
  select email from customers
  where email = ?
  and password_hash = ?`;
  const userID = req.body.userInfo.userID;
  const userPW = req.body.userInfo.userPW;
  const result = await mysql.queryExecute(sql, [userID, userPW]);
  if (result.length == 0) {
    console.log('값 없음');
    return res.json(false);
  }
  res.json(true);
  console.log('[ === login === ]');
});

module.exports = router;
