CREATE TABLE `product_image` (
  `id` INT NOT NULL AUTO_INCREMENT, -- 키.
  `product_id` VARCHAR(100) NOT NULL, -- 상품아이디.
  `type` VARCHAR(10) NOT NULL, -- 메인이미지, 슬라이드이미지, 설명이미지
  `file_name` VARCHAR(100) NOT NULL, -- 이미지파일명.
  `create_date` timestamp default now(), -- 등록시간.
  PRIMARY KEY (`id`));
  -------------------------------------------------
  
  use dev;
  
  -- 글번호, 제목, 내용, 작성자, 등록시간
  create table tbl_board(
  `id` INT NOT NULL AUTO_INCREMENT, -- 글번호
  `title` VARCHAR(50) NOT NULL, -- 제목
  `content` VARCHAR(500) NOT NULL, -- 내용
  `writer` VARCHAR(50) NOT NULL, -- 작성자
  `write_date` TIMESTAMP DEFAULT now(), -- 등록시간
 PRIMARY KEY(`id`));
  
 INSERT INTO tbl_board (title, content, writer)
  VALUES("날씨가 추워요", "오늘은 날씨가 많이 추워요", "user01");
  
 INSERT INTO tbl_board
  SET title = "날씨가 좋아요", content = "해가 밝게 떴네요", writer = "user01";
  
 SELECT * FROM tbl_board;
 
 UPDATE tbl_board
 SET title = "내일은 날씨가?", content = "좋아질까요?"
 WHERE id = 2;
 
 delete from tbl_board
 where id > 6 ;
 
 -- CRUD => 추가, 수정, 삭제, 조회
 -- DB + Expres => localhost:3000/boards (GET) 목록
 -- 							 /board (POST) 등록
 -- 							 /board/:id (GET) 조회
 -- 							 /board (PUT) 수정
 -- 							 /board/:id (DELETE) 삭제
 
CREATE TABLE tbl_comment (
  `comment_id` INT NOT NULL AUTO_INCREMENT,   -- 댓글 고유번호 (PK)
  `board_id` INT NOT NULL,                    -- 어떤 글에 달린 댓글인지 (FK)
  `content` VARCHAR(500) NOT NULL,            -- 댓글 내용
  `writer` VARCHAR(50) NOT NULL,              -- 댓글 작성자
  `write_date` TIMESTAMP DEFAULT NOW(),       -- 작성일시
  PRIMARY KEY (`comment_id`),
  CONSTRAINT fk_comment_board
    FOREIGN KEY (`board_id`) REFERENCES tbl_board(`id`)
    ON DELETE CASCADE                         -- 게시글 삭제 시 댓글 자동 삭제
);
 
SELECT * FROM tbl_comment;

delete from tbl_comment
  where comment_id > 1;