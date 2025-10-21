const mysql = require('./sql');
const cron = require('node-cron');
const winston = require('winston');

const logger = winston.createLogger({
  // level 순위
  // error > warn > info > http > verbose > debug > silly
  level: 'info', // 설정한 값 이상의 level만 작동하겠단 의미
  format: winston.format.combine(
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf((info) => {
      return `${info.timestamp} / [${info.level}] / ${info.message}`;
    })
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'log/info.log' }),
  ],
});
// format: winston.format.printf((info) => `${info.level}: ${info.message}`),

async function customerList() {
  try {
    const sql = `select count(*) as cnt from customers`;
    let result = await mysql.queryExecute(sql, []);
    logger.info(`[ customers의 현재 건수: ${result[0].cnt}건 ]`);
  } catch (err) {
    console.log(`[ Error : ${err} ]`);
  }
}

cron.schedule('*/5 * * * * *', async () => {
  customerList();
});

// 매분마다 customers 테이블의 데이터 수 출력
// function tableLength() {
//   return new Promise(async (resolve, reject) => {
//     const sql = `select * from customers`;
//     const db = await mysql.queryExecute(sql);
//     // console.log(db.length);
//     resolve(db.length);
//   });
// }

// cron.schedule('* * * * * *', async () => {
//   const num = await tableLength();
//   console.log(
//     `현재 customers 테이블의 데이터 수는 ${num}개 입니다. / ${new Date()}`
//   );
// });
