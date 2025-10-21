CREATE TABLE `product_image` (
  `id` INT NOT NULL AUTO_INCREMENT, -- 키.
  `product_id` VARCHAR(100) NOT NULL, -- 상품아이디.
  `type` VARCHAR(10) NOT NULL, -- 메인이미지, 슬라이드이미지, 설명이미지
  `file_name` VARCHAR(100) NOT NULL, -- 이미지파일명.
  `create_date` timestamp default now(), -- 등록시간.
  PRIMARY KEY (`id`));