var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

var mysql = require('mysql');
var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '111111',
  database : 'chicken'
});
db.connect();

// 홈
router.get('/', function(request, response){
  db.query(`SELECT * FROM topic`, function(error, topics){
    var html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport">
        <script src="https://kit.fontawesome.com/352fde3883.js" crossorigin="anonymous"></script>
      <title>나&너먹자</title>
      <link rel="stylesheet" href="home.css">
    <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet">
    
    </head>
    <body>
      <header>
        <a href="/"><img class="logo" src="img/sope.png" alt="너&나먹자 로고"></a>
    
        <nav>
          <ul class="header_items">
            <li>
              <div class="search_bar_container">
                <form class="box">
                  <input type="text" placeholder="가게이름이나 메뉴를 검색해보세요!" class="search"/>
                  <input type="submit" value="&#xf002;">
                </form>
              </div>
            </li>
            <li><a href="#"><i class="fas fa-user"></a></i></li>
            <li><a href="Login.html">
              <button class="btn login">로그인</button>
            </a></li>
            <li><a href="intro.html">
              <button class="btn newbie">처음이신가요?</button>
            </a></li>
          </ul>
        </nav>
      </header>
    
      <div class="background">
        <div class="menu_btns">
          <div class="menu_btns first">
            <div>
              <a class="menu" href="/chicken">
                <img class="menu_img" src="img/fried-chicken.png"/>
              </a>
            </div>
            <div>
              <a class="menu" href="#">
                <img class="menu_img" src="img/pizza.png"/>
              </a>
            </div>
            <div>
              <a class="menu" href="#">
                <img class="menu_img" src="img/koreanfood.png"/>
              </a>
            </div>
            <div>
              <a class="menu" href="#">
                <img class="menu_img" src="img/burger.png"/>
              </a>
            </div>
            <div>
              <a class="menu" href="#">
                <img class="menu_img" src="img/tuna.png"/>
              </a>
            </div>
          
          </div>
          <div class="menu_btns second">
            <div>
              <a class="menu" href="#">
                <img class="menu_img" src="img/cake.png"/>
              </a>
            </div>
            <div>
              <a class="menu" href="#">
                <img class="menu_img" src="img/steak.png"/>
              </a>
            </div>
            <div>
              <a class="menu" href="#">
                <img class="menu_img" src="img/noodle.png"/>
              </a>
            </div>
            <div>
              <a class="menu" href="#">
                <img class="menu_img" src="img/dish.png"/>
              </a>
            </div>
    
          </div>
        </div>
      </div>
    
      <div>
        <p class="swja">새로운 공구 메이트 모집</p>
        <div class="list-items">
          <!--<a href="post.html">-->
          <div class="list-item">
            <p class="title"><a href="/chicken/${topics[0].id}">${topics[0].title}</a><br>${topics[0].created} </p>
            <p class="nickname">${topics[0].author_id}</p>
          <!--</a>-->
          </div>
          <div class="list-item">
          <p class="title"><a href="/chicken/${topics[1].id}">${topics[1].title}</a><br>${topics[1].created} </p>
          <p class="nickname">${topics[1].author_id}</p>
          </div>
          <div class="list-item">
          <p class="title"><a href="/chicken/${topics[2].id}">${topics[2].title}</a><br>${topics[2].created} </p>
          <p class="nickname">${topics[2].author_id}</p>
          </div>
        </div>
        <hr>
        <div class="list-items">
          <div class="list-item">
          <p class="title"><a href="/chicken/${topics[0].id}">${topics[0].title}</a><br>${topics[0].created} </p>
          <p class="nickname">${topics[0].author_id}</p>
          
          </div>
          <div class="list-item">
          <p class="title"><a href="/chicken/${topics[1].id}">${topics[1].title}</a><br>${topics[1].created} </p>
          <p class="nickname">${topics[1].author_id}</p>
          </div>
          <div class="list-item">
          <p class="title"><a href="/chicken/${topics[2].id}">${topics[2].title}</a><br>${topics[2].created} </p>
          <p class="nickname">${topics[2].author_id}</p>
          </div>
        </div>
      </div>
    
      <footer>
            <div class="footer-content">
                <h3>NNMZ</h3>
                <p>인하대학교 자취생 공동구매는 최소 금액과 배달비 등으로 인해 배달음식 이용의 불편을 겪는 학생들에게 제공됩니다. </p>
                <ul class="socials">
                    <li><a href="#"><i class="fa fa-facebook"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter"></i></a></li>
                    <li><a href="#"><i class="fa fa-google-plus"></i></a></li>
                    <li><a href="#"><i class="fa fa-youtube"></i></a></li>
                    <li><a href="#"><i class="fa fa-linkedin-square"></i></a></li>
                </ul>
            </div>
        </footer>
    </body>
    </html>
    `
    response.send(html);
  });
});

  module.exports = router;