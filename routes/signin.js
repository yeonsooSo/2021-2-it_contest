var express = require('express');
var router = express.Router();

var mysql = require('mysql');
const {response} = require('express');
var db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '111111',
    database : 'login'
});

router.post('/signin_process', function(request, response){
    var post=request.body;
    db.query(`
        INSERT INTO user (id, pw, name, phoneNumber, email)
        VALUES(?, ?, ?, ?, ?) 
    `,  [post.id, post.pw, post.name, post.phoneNumber, post.email], function(error, result){
        console.log(post);
        if(error){
            throw(error);
        }
        response.redirect(encodeURI(`/`));
    }
    );
});
// 회원가입
router.get('/', function(request, response){
    var html = `
    <html lang="en">
    <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="wclassth=device-wclassth, initial-scale=1.0">
        <script src="https://kit.fontawesome.com/352fde3883.js" crossorigin="anonymous"></script>
        <title>회원가입</title>
        <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet">
    
        <link rel="stylesheet" type="text/css" href="Signin.css" />
    
        <!-- <script>
            function loginClick(){
         // 메인화면 연결
              }
              function signClick(){
          //회원가입 연결
           lacation.href = "intro.html"
              };
            
        </script>
      -->
    
    </head>
    <body>
    
        <header>
            <a href="/" class="logo"><img class="logo" src="img/sope.png" alt=""></a>
            <nav>
                <ul class="header_items">
                
                    <li><a href="/"><i class="fas fa-user"></a></i></li>
                    <li><a href="/login">
                        <button class="btn login">로그인</button>
                    </a></li>
                </ul>
            </nav>
        </header>
    
    
        <div class="signin-box">
            <h1 class="signin">회원가입</h1>
            
         <form action="/signin_process" method="post">
            <h5 class="signin-text">학번</h5> 
            <input name="id" type="text" class="input-box" maxlength="8">
            <h5 class="signin-text">비밀번호</h5>
            <input name="pw" type="password" class="input-box" maxlength="14">
            <h5 class="signin-text">이름</h5>
            <input name="name" type="text" class="input-box" maxlength="14">
            <h5 class="signin-text">전화번호</h5>
            <input name="phoneNumber" type="text" class="input-box" maxlength="11">
            <h5 class="signin-text">이메일 주소</h5>
            <input name="email" type="email" class="input-box">
    
            
            <p class="buttons">
                <a href="/"><input type="button" class="cancel-btn"; value="취소";></a>
                <a href="/signin_process"><input type="button" class="sign-btn"; value="등록";></a>
            </p>
    
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