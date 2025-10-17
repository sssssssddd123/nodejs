// 모듈 사용 선언
const express = require('express');
const fs = require('fs');
const cookieSession = require('cookie-session');
const multer = require('multer');
const customerRouter = require('./routes/customer');
const productRouter = require('./routes/products');
const boardRouter = require('./routes/board');

// express를 사용한 서버 인스턴스
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 쿠키세션 설정
app.use(
  cookieSession({
    name: 'session',
    keys: ['123'], // 암호화 키
    maxAge: 24 * 60 * 60 * 1000, // 시간(24h)
  })
);

// 파일 업로드 설정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'upload/imgs/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const originalName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8'
    );
    cb(null, Date.now() + '-' + originalName);
  },
});

// 숙제: 여라파일 업로드하는 로직 만들기

// multer 객체 설정
const upload = multer({ storage: storage });

// 서버 가동 함수
// .listen(포트, 콜백 함수)
app.listen(3000, () => {
  console.clear();
  console.log('[ server 가동 완료 | Port: 3000]');
});

// 정적 디렉토리 설정
app.use(express.static('public'));

// 라우팅 정보를 파일로 나눠서 작성
// customers.js / products.js
app.use('/customers', customerRouter); // '/', '/add'
app.use('/products', productRouter); // '/', '/add'
app.use('/board', boardRouter);

// 라우팅
// http:// ... /test
// 엔드포인트('/') 뒤에 붙는 주소
// get / post / put / delete
app.get('/', (req, res) => {
  fs.readFile('./root.html', 'utf-8', (err, data) => {
    if (err) {
      res.status(500).send('[ Error ( reading file ) ]');
      return;
    }
    res.send(data);
  });
});

app.post('/', (req, res) => {
  console.log(req.body);
  res.send('POST request to the homepage');
});

// cookie-session 테스트
app.get('/login', (req, res) => {
  if (!req.session.views) {
    req.session.views = 1;
  } else {
    req.session.views++;
  }
  res.send(`현재 ${req.session.views}번째 방문입니다.<br>
    <a href='/logout'>로그아웃</a>`);
});

app.get('/logout', (req, res) => {
  req.session = null;
  res.redirect('/login');
});

// 파일 업로드 테스트
app.post('/upload', upload.single('profile'), (req, res) => {
  console.log(req.file);
  res.send('파일 업로드 완료');
});

// http://localhost:3000/hongkildong/90
// app.post('/:user/:score', (req, res) => {
//   console.log(req.params);
//   res.send('POST request to the homepage');
// });

let students = [
  {
    sno: 100,
    sname: '홍길동',
    score: 50,
  },
];

// app.post('/test/:sno', (req, res) => {
//   console.log(req.params.sno);
//   const data = students.reduce((acc, elem) => {
//     if (req.params.sno != elem.sno) {
//       return;
//     }
//     let test = {
//       sno: elem.sno,
//       sname: elem.sname,
//     };
//     test.score =
//       elem.score >= 60 ? `합격(${elem.score})` : `불합격(${elem.score})`;
//     acc.push(test);
//     return acc;
//   }, []);
//   res.send(`<span>학번: ${data[0].sno}</span><br>
//     <span>이름: ${data[0].sname}</span><br>
//     <span>합격여부: ${data[0].score}</span>`);
// });

const data = fs.readFileSync((src = './public/test/user_info.txt'), 'utf-8');
app.post('/test/login', (req, res) => {
  const loginData = data
    .split('\n')
    .filter((item) => item.trim() != '')
    .map((item) => {
      const [id, pw, name] = item
        .replace('\r', '')
        .split(',')
        .map((item2) => item2.trim());
      return { userId: id, userPw: pw, userName: name };
    });
  // console.log(loginData);
  console.log(req.body);
  loginData.reduce((acc, elem) => {
    if (elem.userId != req.body.userId) {
      console.log(elem.userId);
      console.log(req.body.userId);
      res.send('아이디 틀림');
      return;
    }
    return acc;
  }, '');
  res.send('반갑다');
});
