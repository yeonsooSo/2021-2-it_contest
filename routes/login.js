var express = require('express');
var router = express.Router();
var template = require('../lib/template.js');

var mysql = require('mysql');
var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '111111',
  database : 'login'
});
db.connect();

// 로그인 창
router.get('/', function(request, response){
    var html = `
    <html lang="en">
    <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/352fde3883.js" crossorigin="anonymous"></script>
        <title>로그인</title>
    
        <link rel="stylesheet" type="text/css" href="Login.css" />
        <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet">
        
        <script>
            function loginClick(){
         // 메인화면 연결
              }
              function signClick(){
          //회원가입 연결
           location.href = "/.Signin.html"
              };
            
        </script>
     
    
    </head>
    <body>
        <header>
            <a href="/" class="logo"><img class="logo" src="img/sope.png" alt=""></a>
    
        </header>
    
        <div class="login-box">
            <h1 class="main-login">로그인</h1>
            
         <form >
            <h5 class="login-text">학번</h5> 
            <input type="id" class="input-box" maxlength="8">
            <h5 class="login-text">비밀번호</h5>
            <input type="password" class="input-box" maxlength="14">
            <h6 class="question">혹시 회원이 아니신가요?</h6>
            <p><a href="/signin"><input type="button" class="sign-btn"; value="회원가입"; onclick="signClick()"></a></p>
            <p><a href="/"><input type="button" class="login-btn"; value="로그인"; onclick="loginClick()"></a></p>
         </form>     
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
    
    
       <!-- <script type="text/javaScript" src="Login.js"></script>-->
      
    
    </body>
    </html>
    `
    response.send(html);
});

  module.exports = router;