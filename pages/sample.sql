-- 로그인 데이터베이스
CREATE DATABASE login;

-- 각 카테고리별 데이터베이스 생성
CREATE DATABASE chicken;
CREATE DATABASE pizza;
CREATE DATABASE koreanfood;
CREATE DATABASE fastfood;
CREATE DATABASE japanesefood;
CREATE DATABASE dessert;
CREATE DATABASE asianfood;
CREATE DATABASE chinesefood;
CREATE DATABASE anything;

-- 유저 로그인
create table `user`(
    -> `id` varchar(15) not null,
    -> `pw` varchar(255) not null,
    -> `name` varchar(30) not null,
    -> `phoneNumber` varchar(255) not null,
    -> `email` varchar(255) not null,
    -> primary key(id)
    -> );

-- 저자
CREATE TABLE `author` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
);

-- 샘플 데이터 
INSERT INTO `author` VALUES (1,'egoing');
INSERT INTO `author` VALUES (2,'duru');
INSERT INTO `author` VALUES (3,'taeho');
 
-- 게시판
CREATE TABLE `topic` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(30) NOT NULL,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);
 
-- 치킨 샘플 데이터
INSERT INTO `topic` VALUES (1,'BBQ','BBQ is...',NOW(),1);
INSERT INTO `topic` VALUES (2,'BHC','BHC is ...',NOW(),1);
INSERT INTO `topic` VALUES (3,'호식이 두마리','호식이 두마리 is ...',NOW(),2);
INSERT INTO `topic` VALUES (4,'호치킨','호치킨 is ...',NOW(),3);
INSERT INTO `topic` VALUES (5,'피나치공','피나치공 is ...',NOW(),1);

-- 피자 샘플 데이터
INSERT INTO `topic` VALUES (1,'도미노','도미노 is...',NOW(),1);
INSERT INTO `topic` VALUES (2,'알볼로','알볼로 is ...',NOW(),1);
INSERT INTO `topic` VALUES (3,'미스터 피자','미스터 피자 is ...',NOW(),2);
INSERT INTO `topic` VALUES (4,'피나치공2','피나치공2 is ...',NOW(),3);
INSERT INTO `topic` VALUES (5,'피자헛','피자헛 is ...',NOW(),1);

-- 댓글
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `description` text,
  `created` datetime NOT NULL,
  `author_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO `comment` VALUES (1, '1빠', NOW(), 1);
INSERT INTO `comment` VALUES (2, '2빠', NOW(), 2);
INSERT INTO `comment` VALUES (3, '3빠', NOW(), 3);
INSERT INTO `comment` VALUES (4, '4빠', NOW(), 2);
INSERT INTO `comment` VALUES (5, '5빠', NOW(), 1);