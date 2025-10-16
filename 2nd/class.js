console.clear();
console.log('--------------------------[node start]--------------------------');
// class.js
// Object를 정리하기 위해 Class를 사용함
// ex)
// 자동차엔 어떤 요소가 필요한가 미리 정해둔 도면
let obj = new Object(); // 객체 생성
obj.name = '김민수';

let student1 = {
  sno: 100,
  sname: '홍길동',
  grade: 1,
  height: 170,
  weight: 65,
  showInfo: function () {
    return `[showInfo] 학번: ${this.sno}, 이름: ${this.sname}`;
  },
};

let student2 = {
  sno: 200,
  sname: '최길동',
  grade: 1,
  height: 177,
  weight: 77,
  // showInfo: function () {
  //   return `[showInfo] 학번: ${this.sno}, 이름: ${this.sname}`;
  // },
};

// Student에 대한 Class(Student의 구성엔 어떤것이 필요한지 미리 정해둠)
class Student {
  // 학번, 이름, 학년, 키, 몸무게 ...
  // -> Student의 속성(키: 밸류)
  // -> Class의 constructor(생성자라고도 함) 함수로 만들 수 있음
  constructor(sno, sname, grade, height, weight) {
    // this는 Class로 만들어진 객체(Student)를 뜻함
    // ex)
    // this.sno = 1
    // -> Student { sno: 1 }
    this.sno = sno;
    this.sname = sname;
    this.grade = grade;
    this.height = height;
    this.weight = weight;
  }

  // 공부하기, 밥 먹기, 잠 자기 ...
  // -> 메소드(기능)
  showInfo() {
    return `[showInfo] 학번: ${this.sno}, 이름: ${this.sname}`;
  }
}

// 미리 만들어둔 규칙(Class Student)을 활용하여 인스턴스 생성
let std1 = new Student(200, '김민규', 2, 165, 56);
let std2 = new Student(400, '박민식', 3, 180, 86);

console.log(std1.showInfo());
console.log(std2.showInfo());

console.log('---------------------------[node end]---------------------------');
