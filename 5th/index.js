const mysql = require('./sql');
const xlsx = require('xlsx'); // 엑셀파일 읽게해 주는 모듈

function excel_to_db() {
  // MySQL -> excel
  // workbook - sheet

  // 워크북 생성
  const workbook = xlsx.readFile('./files/new_customers.xlsx');

  // 첫 번째 시트의 이름 지정
  const firstSheetName = workbook.SheetNames[0];

  // 첫 번째 시트 생성
  const firstSheet = workbook.Sheets[firstSheetName];

  // 생성된 시트를 json으로 반환해 줌
  const excelData = xlsx.utils.sheet_to_json(firstSheet);
  console.log(excelData);
  console.log(workbook.SheetNames);

  // excelData.forEach(async (item) => {
  //   const sql = `insert into customers set ?`;
  //   const result = await mysql.queryExecute(sql, [item]);
  //   console.log(result);
  // });
}
excel_to_db();

function db_to_excel() {
  mysql
    .queryExecute(`select id, name, email, phone, address from customers`, [])
    .then((result) => {
      console.log(result);

      // 워크북 생성 -> sheet 추가 -> 파일 저장
      // 워크북이란
      // -> db에서 검색한 data를 보여주는 sheet가 포함된 파일
      const workbook = xlsx.utils.book_new();

      // MySQL에서 가져온 db를 sheet로 만들어 줌
      const firstSheet = xlsx.utils.json_to_sheet(result, {
        header: ['id', 'name', 'email', 'phone', 'address'],
      });

      // workbook에 sheet 추가
      xlsx.utils.book_append_sheet(workbook, firstSheet, 'customers');

      // ./files/ 경로에 xlsx 파일으로 저장
      xlsx.writeFile(workbook, './files/customers.xlsx');
    })
    .catch((err) => {
      console.log(err);
    });
}

// async function db_to_excel() {
//   try {
//     const sqlDB = await mysql.queryExecute(
//       `select id, name, email, phone, address from customers`,
//       []
//     );
//     console.log(sqlDB);

//     // 워크북 생성 -> sheet 추가 -> 파일 저장
//     // 워크북이란
//     // -> db에서 검색한 data를 보여주는 sheet가 포함된 파일
//     const workbook = xlsx.utils.book_new();

//     // MySQL에서 가져온 db를 sheet로 만들어 줌
//     const firstSheet = xlsx.utils.json_to_sheet(sqlDB, {
//       header: ['id', 'name', 'email', 'phone', 'address'],
//     });

//     // workbook에 sheet 추가
//     xlsx.utils.book_append_sheet(workbook, firstSheet, 'customers');

//     // ./files/ 경로에 xlsx 파일으로 저장
//     xlsx.writeFile(workbook, './files/customers_test.xlsx');
//   } catch (err) {
//     console.log(err);
//   }
// }
// db_to_excel();
