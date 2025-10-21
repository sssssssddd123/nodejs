const express = require('express');
const mysql = require('./sql');
const excelMailTest = require('./sendmail');
const xlsx = require('xlsx');
const multer = require('multer');
const fs = require('fs');
const cron = require('node-cron');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(
  express.json({
    limit: '50mb',
  })
);
const port = 3000;

// 정적 디렉토리 설정
// 정적 디렉토리란
// -> 서버가 따로 코드(파일을 가져온다는 코드)를 실행 안 하고,
//    하드디스크의 폴더에서 파일을 직접 가져갈 수 있게 설정하는 경로
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.send('반갑다.');
});

app.post('/upload/:products/:type/:fileName', (req, res) => {
  const dir = `upload/${req.params.products}/${req.params.type}`;
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  const filePath = `${dir}/${req.params.fileName}`;
  console.log(req.params);
  // console.log(
  //   req.body.imageBase64.slice(req.body.imageBase64.indexOf(';base64,') + 8)
  // );
  const base64Data = req.body.imageBase64.slice(
    req.body.imageBase64.indexOf(';base64,') + 8
  );
  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('파일 저장 실패');
    }
    console.log('파일 저장 완료');
  });
  res.send('test');
});

// upload할 경로, 파일명 지정
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = 'upload/files/';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const originalName = Buffer.from(file.originalname, 'latin1').toString(
      'utf8'
    );
    cb(null, Date.now() + '_' + originalName);
  },
});

const upload = multer({ storage: storage });

function uploadPromise(req, res) {
  return new Promise((resolve, reject) => {
    upload.array('excelFile')(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

function uploadExcelToDB(excel) {
  const fileDir = excel;
  const workbook = xlsx.readFile(fileDir);
  const firstSheetName = workbook.SheetNames[0];
  const firstSheet = workbook.Sheets[firstSheetName];
  const excelData = xlsx.utils.sheet_to_json(firstSheet);
  excelData.forEach(async (item) => {
    const sql = `insert into customers set ?`;
    const result = await mysql.queryExecute(sql, [item]);
  });
}

app.post('/upload/excel', async (req, res) => {
  try {
    await uploadPromise(req, res);
    if (req.files.length == 0) {
      res.send('업로드할 파일이 없습니다');
      throw new Error('[ 업로드할 파일이 없습니다 ]');
    }
    uploadExcelToDB(req.files[0].path);
    res.status(200).send('업로드 완료');
  } catch (err) {
    res.status(500).send(err);
  }
});

async function db_to_excel(sql) {
  try {
    const sqlDB = await mysql.queryExecute(sql, []);
    const workBook = xlsx.utils.book_new();
    const workSheet = xlsx.utils.json_to_sheet(sqlDB);
    xlsx.utils.book_append_sheet(workBook, workSheet, 'customers');
    xlsx.writeFile(workBook, './files/customers_mailTest.xlsx');
  } catch (err) {
    console.log(err);
  }
}

// customer 테이블 조회
// -> workbook 생성
// -> 첨부파일 활용하여 이메일 전송
app.get('/customerInfo', async (req, res) => {
  const sql = `select * from customers`;
  let result = await db_to_excel(sql);
  excelMailTest.mailSendFunc('gda521@daum.net', 'customers_mailTest.xlsx');
  if (result == '') {
    res.send('[ Error : 데이터 없음]');
    return;
  }
  res.send('전송 완료');
});

async function db_to_txt(sql) {
  try {
    const sqlDB = await mysql.queryExecute(sql, []);
    return sqlDB;
  } catch (err) {
    console.log(err);
  }
}

const cronTest = cron.schedule(
  '* * * * * *',
  async () => {
    const sql = `select id, name, email, phone, address from customers`;
    const result = await db_to_txt(sql);
    if (result == '') {
      res.send('[ Error : 데이터 없음]');
      return;
    }
    const sqlDB = JSON.stringify(result, null, 2);
    fs.writeFileSync('./files/sample.txt', sqlDB, 'utf-8');
    console.log('cron test');
    // excelMailTest.mailSendFunc('gda521@daum.net', 'sample.txt');
  },
  {
    scheduled: false,
  }
);

app.get('/cron/start', async (req, res) => {
  cronTest.start();
  res.send('전송 완료');
});

app.listen(port, () => {
  console.log(`[ 서버 가동 완료 : http://localhost:${port}/ ]`);
});
