const express = require('express');
const app = express();

var fs = require('fs');
var url = require('url');

var template = require('./lib/template.js');

var compression = require('compression');
var chickenRouter = require('./routes/chicken.js');
var indexRouter = require('./routes/index.js');
var introRouter = require('./routes/intro.js');
var loginRouter = require('./routes/login.js');
var signinRouter = require('./routes/signin.js');

var mysql = require('mysql');
var db = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '111111',
  database : 'chicken'
});
db.connect();

// 미들웨어 사용
app.use(express.static('pages'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(compression()); // 압축

app.use('/chicken', chickenRouter);
app.use('/', indexRouter);
app.use('/intro', introRouter);
app.use('/login', loginRouter);
app.use('/signin', signinRouter);

app.use(function(request, response, next){ // dpfjcjfl
  response.status(404).send('Sorry cant find that!');
});

app.use(function(err, request, response, next){
  console.error(err.stack);
  response.status(500).send('Something broke!');
});

app.listen(3000, ()=>console.log('Example app listening on port 3000'))