var mariadb = require('mariadb');
var bkfd2Password = require('pbkdf2-password');
var hasher = bkfd2Password();

const pool = mariadb.createPool({
  host: 'localhost',
  user: 'root',
  password: 'xxxx', //비밀번호
  connectionLimit: 10,
  database:"test"
});

 exports.SignIn = async function(req){
   var json = {};
   var cnt=0;
   json.code = 0;
   var conn = await
   pool.getConnection();
   var userid = req.body.userid;
   var password = req.body.password;
   var username=req.body.username;
   var user
   var query = "SELECT userid, password, salt, name FROM member where userid='"
   + userid +"' ;";
   var rows = await conn.query(query);

   if(rows[cnt]) {

     var userSalt = rows[cnt].salt;
     var userPass = rows[cnt].password;
     return new Promise((resolve, reject) =>{
       hasher({password:password, salt:userSalt}, (err, pass, salt, hash) => {
         if(hash != userPass) {
           json.code = 10000;
           json.msg = "패스워드 일치하지 않습니다.";
            json.data = {};
          }
          else {
            json.data = rows[cnt];
            cnt++;
          }
          resolve(json);
        });
      });
    }
    else {
      json.code = 10000;
      json.msg = "ID 일치하지 않습니다.";
      json.data = {};
      return json;
    }
  };
  exports.SignUp = async function(req,res){
    var resultcode = 0;
    var conn = await pool.getConnection();
    var userid = req.body.userid;
    var password = req.body.password;
    var name = req.body.name;
    var query = "SELECT userid, password, name, salt FROM member where userid='"
    + userid +"';";
    var rows = await conn.query(query);
    if(rows[0] == undefined) {
      hasher({password:password}, async (err, pass, salt, hash) => {
        var query = " insert into member (userid, password, name, salt, date) values ('" +
        userid +"','" + hash +"','" + name +"', '"+ salt +"', CURRENT_TIMESTAMP());";
        var rows = await conn.query(query);

      });
    }
    else {
      resultcode = 100;
    }
    return resultcode;
  };
