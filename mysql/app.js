const express = require('express');
const mysql = require('./sql/index');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static('public'));

// 메일
const transporter = nodemailer.createTransport({
  host: 'smtp.daum.net',
  port: 465,
  secure: true,
  auth: {
    user: 'gda521@daum.net',
    pass: 'bubeujxhxwcsuwxo',
  },
});

// 메인 화면
app.get('/', (req, res) => {
  res.send('Hello, World');
});

// 메일 테스트
// 회원 정보 찾기
app.get('/sendmail', async (req, res) => {
  console.log(req.query);
  const sql = `select * from customers where name = ? and phone = ?`;
  const param = [req.query.name, req.query.phone];
  let result = await mysql.queryExecute(sql, param);
  if (result == '') {
    res.send('일치하는 데이터가 없습니다.');
    return;
  }
  const data = {
    from: 'gda521@daum.net',
    to: 'gda521@daum.net',
    subject: 'Test User',
    html: `
    <p>New Password is "1234"</p><br>
    <p>User: ${result[0].name}</p>`,
  };
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(info);
      res.status(200).send('성공');
    }
  });
});

// 메일 발송
app.get('/transmitMail', async (req, res) => {
  const isData = req.query;
  const isNull = Object.values(isData).some(
    (item) => item == '' || item.trim() == ''
  );
  if (isNull) {
    res.send('전송 실패: 빈 내용이 있습니다.');
    return;
  }
  const data = {
    from: 'gda521@daum.net',
    to: req.query.to,
    subject: req.query.title,
    html: req.query.message.replace(/\r?\n/g, '<br>'),
  };
  console.log(data);
  transporter.sendMail(data, (err, info) => {
    if (err) {
      console.log(err);
      res.status(500).send({ error: err.message });
    } else {
      console.log(info);
      res.status(200).send('성공');
    }
  });
});

// middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MySQL customers db를 모두 불러옴
app.get('/customers', async (req, res) => {
  const sql = `select * from customers`;
  let result = await mysql.queryExecute(sql, []);
  res.send(result);
});

// MySQL customers db를 한 건만 불러옴
app.get('/customer/:name', async (req, res) => {
  const sql = `select * from customers where name = ?`;
  const param = [req.params.name];
  let result = await mysql.queryExecute(sql, param);
  res.send(result);
});

// MySQL에 db를 추가
app.post('/customer', async (req, res) => {
  const sql = `insert into customers set ?`;
  const param = req.body;
  let result = await mysql.queryExecute(sql, param);
  res.send(result);
});

// MySQL db를 삭제
app.delete('/customers/:id', async (req, res) => {
  const sql = `delete from customers where id = ?`;
  const delId = [req.params.id];
  let result = await queryExecute(sql, delId);
  res.send(result);
});

// MySQL db Updata
app.put('/customers', async (req, res) => {
  const sql = `update customers set ? where id = ?`;
  const param = req.body;
  let result = await mysql.queryExecute(sql, param);
  res.send(result);
});

// 서버 가동
const port = 3000;
app.listen(port, () => {
  console.log(`[ 서버 가동 완료: http://localhost:${port} ]`);
});

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//

const { rejects } = require('assert');
const crypto = require('crypto');

// DB의 값을 암호화한 값 vs 사용자가 입력한 값을 암화한 값
// -> 서로 비교 후 판별

// salting 임의의 구문 -> 동일한 평문(비밀번호) -> 다른 암호값
// let salt = crypto.createHash('sha256').update('1234').digest('hex');
// console.log(salt);

function getCryptoPasswd(password) {
  return new Promise((resolve, reject) => {
    let salt = crypto.randomBytes(64).toString('base64');
    crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, key) => {
      if (err) {
        console.error(err);
        return reject(err);
      }
      resolve({ salt: salt, password: key.toString('base64') });
    });
  });
}

// MySQL에 db를 추가
app.post('/signup', async (req, res) => {
  const getPw = await getCryptoPasswd(req.body.password);
  const sql = `insert into customers set ?`;
  const param = {
    name: req.body.userid,
    email: req.body.email,
    phone: req.body.tel,
    password_hash: getPw.password,
    password_salt: getPw.salt,
  };
  // console.log(param);
  let result = await mysql.queryExecute(sql, param);
  res.send(result);
});

app.post('/login', async (req, res) => {
  try {
    const sql = `
    select password_hash, password_salt
    from customers where email = ?`;
    const email = [req.body.email];
    const pw = req.body.password;
    console.log(pw);
    let result = await mysql.queryExecute(sql, email);
    if (result.length == 0) {
      res.send('email 틀림');
      return;
    }
    await new Promise((resolve, reject) => {
      let salt = result[0].password_salt;
      crypto.pbkdf2(pw, salt, 100000, 64, 'sha512', (err, key) => {
        if (err) {
          return reject(err);
        }
        if (result[0].password_hash !== key.toString('base64')) {
          return reject(new Error('pw 틀림'));
        }
        resolve();
      });
    });
    res.status(200).send('맞음');
  } catch (err) {
    console.error('로그인 에러', err);
    res.status(401).send('pw 틀림');
  }
});
