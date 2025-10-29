const mysql = require('mysql2/promise');

// MySQL Pool 생성하기 위한 정보
const dbConfig = {
  host: 'localhost',
  user: 'dev01',
  password: '1234',
  database: 'dev',
  port: 3306,
  connectionLimit: 10,
};

// Pool 생성
const pool = mysql.createPool(dbConfig);

// 함수
function queryExecute(sql, params) {
  let connection;
  return new Promise(async (resolve, reject) => {
    try {
      let conn = await pool.getConnection();
      connection = conn;
      const [rows, fields] = await connection.query(sql, params);
      resolve(rows);
    } catch (err) {
      reject(err);
    } finally {
      if (connection) connection.release();
    }
  });
}

module.exports = { queryExecute };
