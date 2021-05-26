var express = require('express');
var router = express.Router();

// 인트로
router.get('/', function(request, response){
    var html = `
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>소개 및 이용 안내</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" type="text/css" href="intro.css" />
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet">
    </head>
    
    <body style="background-color:#FFD112";>
        <div class="back-box">
            <a href="/"><img class="logo" src="img/sope.png" alt="너&나먹자 로고"></a>
            <p><a href="signin"><input type="button" class="sign-btn" value="회원가입" ></a>
                <a href="/login"><input type="button" class="login-btn" value="로그인"></a></p>
            <h1 class="title">소개 <span class="between">및</span> 이용 안내</h1>
            <!-- <div id= "title-line"></div> -->
            <p class="sub-title">소개</p>
            <p class="sub-text">인하대 자취생 공동구매는 최소 금액과 배달비 등으로 인해<br>
                배달음식 이용의 불편을 겪는 학생들에게 제공됩니다.</p>
            <img class="img" src="img/intro.png">
            <p class="sub-title">이용 안내</p>
            <p class="sub-text">가입자는 먹고 싶은 메뉴로 공동구매 제안 글을 작성할 수 있습니다.<br>
                제안자는 가게 이름과 시간, 배분 장소 등을 공지하여 참여자를 모집하고<br>
                원하는 참여자들은 제안 글에 댓글을 달아서 참여합니다.</p>
            <p class="sub-text-mini">(온전한 참여를 위해, No-Show 시에  해당 참여자의 보증금이 차감됩니다.)</p>
            <p class="sub-text">제안자와 참여자들은 지정된 시간에 장소로 나와서<br>각자 주문한 메뉴를 배분 받습니다.</p>
            <div class="go-btn"><a href="/"><input button"; value="지금 구매하러 가기!";></a></div>
        </div>
    
    
    </body>
    </html>
    `
    response.send(html);
});

  module.exports = router;