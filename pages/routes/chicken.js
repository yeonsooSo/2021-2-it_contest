var express = require('express');
var router = express.Router();
var fs = require('fs');
var template = require('../lib/template.js');

var mysql = require('mysql');
const { response } = require('express');
var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '111111',
  database : 'chicken'
});
db.connect();

// 생성
// css 적용 안된거 같음
router.get('/create', function(request, response){
  db.query(`SELECT * FROM topic`, function(error, topics){
    db.query('SELECT * FROM author', function(error2, authors){
      var list = template.list(topics);
      var html = `
      <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/352fde3883.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet">

<!-- Milligram CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css">
    
    <title>공동구매 글 작성</title>


    <link rel="stylesheet" type="text/css" href="write.css" />

</head>
<body>
    <header>
        <a href="/"><img class="logo" src="img/sope.png" alt=""></a>


	</header>

    <div class="post-box">
        <p class="title-box"><span class="title">공동구매  </span><span class="sub-title">치킨</span></p>
        
        <div>
            <form class="text-box" action="/chicken/create_process" method="POST">
                <fieldset>
                  <label for="nameField">제목</label>
                  <input name="title" type="text" placeholder="ex) 05.20 저녁 6시 00치킨 6명 모집" id="nameField">
                  <label for="nameField">내용</label>
                  <textarea name="description" rows="12" placeholder="가게 이름: &#13;&#10;&#13;&#10;먹을 시간 (점심, 저녁): &#13;&#10;&#13;&#10;배분 장소: &#13;&#10;&#13;&#10;배분 시간: &#13;&#10;&#13;&#10;모집인원 범위: &#13;&#10;&#13;&#10;계좌: &#13;&#10;&#13;&#10;" id="commentField"></textarea>
                  <br>
                  <input class="com" type="submit" value="글쓰기">
                </fieldset>
            </form>
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
`;
      response.send(html);
    });
  });
  });
  
router.post('/create_process', function(request,response){
  var post = request.body; // body가 비었음
  var title = post.title;
  var description = post.description;
  console.log(post);
  db.query(`
  INSERT INTO  topic (title, description, created, author_id)
   VALUES(?, ?, NOW(), ?)`,
   [title, description, post.author],
   function(error, result){
     if(error){
       throw error;
     }
     response.redirect(encodeURI(`/chicken/${result.insertId}`));
   }
  );
});
  
  // 수정
router.get('/update/:pageId', function(request, response){
  db.query(`SELECT * FROM topic`, function(error, topics){
    if(error){
      throw error;
    }
    db.query(`SELECT * FROM topic WHERE id=?`, [request.params.pageId], function(error2, topic){
      if(error2){
        throw error2;
      }
      db.query('SELECT * FROM author', function(error2, authors){
        // 객체 undefined
        var title = topic[0].title;
        var list = template.list(topics);
        var description = topic[0].description;
        var html = template.html(title, list,`
        <form action="/page/update_process" method="POST">
        <input type="hidden" name="id" value="${topic[0].id}">
        <p><input type="text" name="title" placeholder="title" value="${title}"></p>
        <p>
        ${template.authorSelect(authors, topic[0].author_id)}
        </p>
        <p>
            <textarea name="description" placeholder="description">${description}</textarea>
        </p>
  
        <p>
            <input type="submit">
        </p>
      </form>
      `,
      `<a href="/page/create">create</a> <a href="/page/update/${topic[0].id}">update</a>`);
    response.send(html);
      });
    });
  });
});

router.post('/update_process', function(request,response){
  var post = request.body;
  var title = post.title;
  var description = post.description;
  var id = post.id;
  db.query('UPDATE topic SET title=?, description=?, author_id=? WHERE id=?',[title, description, post.author, id], function(error, result){
    if(error){
      throw error;
    }
    response.redirect(encodeURI(`/page/${id}`));
  });
});

// 삭제
router.post('/delete_process', function(request,response){
  var post = request.body;
  var id = post.id;
  db.query(`DELETE FROM topic WHERE id=?`, [id], function(error, result){
    if(error){
      throw error;
    }
    response.redirect('/');
  });
});

// 치킨 게시판
// 날짜 수정
router.get('/', function(request, response,next){
  db.query(`SELECT * FROM topic`, function(error, topics){
    if(error){
      throw error;
    }
  var list = template.list(topics);
  var html = `
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <script src="https://kit.fontawesome.com/352fde3883.js" crossorigin="anonymous"></script>
      <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet">
  
  <!-- <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css"> -->
      
      <title>공동구매 리스트</title>
      <link rel="stylesheet" type="text/css" href="list.css" />
  
  </head>
  <body>
      <header>
      <a href="/"><img class="logo" src="img/sope.png" alt=""></a>
  
    </header>
  
      <!-- <div class="post-box"> -->
          <p class="title-box"><span class="title">공동구매  </span><span class="sub-title">치킨</span></p>
          <a href="/chicken/create"><input class="write" type="button" value="글쓰기"></a>
          
          <div class="mainWrapper">
  
              <ul>
                  <!-- 게시판 목록  -->
                  <li>
                      <ul id ="ulTable">
                          <li>
                              <ul>
                                  <li>No</li>
                                  <li>제목</li>
                                  <li>작성일</li>
                                  <li>작성자</li>
                                  <li>조회수</li>
                              </ul>
                          </li>
                          ${list}                                      
                      </ul>
                  </li>
      
                  <!-- 게시판 페이징 영역 -->
                  <li>
                      <div id="divPaging">
                          <div>◀</div>
                             <div><b>1</b></div>
                          <div>2</div>
                          <div>3</div>
                          <div>4</div>
                          <div>5</div>
                          <div>▶</div>
                      </div>
                  </li>
      
                  <!-- 검색 폼 영역 -->
                  <li id='liSearchOption'>
                      <div>
                          <select id='selSearchOption' >
                              <option value='A'>제목+내용</option>
                              <option value='T'>제목</option>
                              <option value='C'>내용</option>
                          </select>
                          <input id='txtKeyWord' />
                          <input class="yel"type='button' value='검색'/>
                      </div>
                      </li>
      
              </ul>
          <!-- </div> -->
      
      
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
  `; 
  response.send(html);
  });
});

// 치킨 게시판 - 각 글을 클릭했을 때
// 댓글 기능 구현은 일단 제외하고 생각 (두번째 sql문에서 comment select 일단 뺐음)
// css 적용 안된거 같음
router.get('/:pageId', function(request, response, next){
  db.query(`SELECT * FROM topic`, function(error, topics){
    if(error){
      throw error;
    }
    // 일단 댓글 기능 구현 stop
    db.query(`SELECT * FROM topic
    LEFT JOIN author ON topic.author_id=author.id
    WHERE topic.id=?`, [request.params.pageId], function(error2, topic){
      if(error2){
        throw error2;
      }
      var title = topic[0].title;
      var list = template.list(topics);
      var mainList = template.mainList(topics);
      var description = topic[0].description;
      var commentList = template.commentList(topic);
      console.log(topic.length);
      var html = `
      <html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://kit.fontawesome.com/352fde3883.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap" rel="stylesheet">

<!-- Milligram CSS -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/milligram/1.4.1/milligram.css">
    
    <title>글 상세 출력</title>


    <link rel="stylesheet" type="text/css" href="post.css" />

</head>
<body>
    <header>
        <a href="home.html"><img class="logo" src="img/sope.png" alt=""></a>


	</header>

    <div class="post-box">
        <p class="title-box"><span class="title">공동구매  </span><span class="sub-title">치킨</span></p>
        <div class="container">
            <div class="row">
                <table class="table table-striped" style="text-align: center; border: 1px solid #dddddd">
                    <thead>
                        <tr>
                            <th colspan="3"">공동구매 제안 글</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>글 제목</td>
                            <td class="con" colspan="2">${title}</td>
                        </tr>
                        <tr>
                            <td>작성자</td>
                            <td class="con" colspan="2">${topic[0].name}</td>
                        </tr>
                        <tr>
                            <td>작성 일자</td>
                            <td class="con" colspan="2">${description}</td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td colspan="2" style="min-height: 200px; text-align: left;">
                              ${description}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <div class="mod-del">
            <input type="button" class= "mod" value="수정">
            <form action="/chicken/delete_process" method="post">
              <input type="hidden" class="del" name="id" value="${request.params.pageId}">
              <input type="submit" class="del" value="삭제">
            </form>
        </div>
        <ul id ="ulTable">
            <li>
                <ul>
                    <li>1</li>
                    <li class="left">후라이드 치킨 1</li>
                    <li>jk</li>
                </ul>
            </li>

            <li>
                <ul>
                    <li>2</li>
                    <li class="left">메뉴메뉴메뉴 수량</li>
                    <li>ㅡㅜ</li>
                </ul>
            </li>

            <li>
                <ul>
                    <li>3</li>
                    <li class="left">메뉴메뉴메뉴 수량</li>
                    <li>wqe</li>
                </ul>
            </li>

            <li>
                <ul>
                    <li>4</li>
                    <li class="left">메뉴메뉴메뉴 수량</li>
                    <li>asd</li>
                </ul>
            </li>
        </ul>
        <input class="joinBtn" type="button" value="참여하기">
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
      `;
    response.send(html);
    });

  });
});

module.exports = router;