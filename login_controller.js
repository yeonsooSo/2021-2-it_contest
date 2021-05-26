var service_main = require("../services/login-service");
// 회원로그인 컨트롤러
exports.SignIn = async function(req,res){
  //console.log( req.body);
  var result = await service_main.SignIn(req);
  if(result.code ==0) {
    res.cookie('userid', result.data.userid);
    res.cookie('username', result.data.name,{
      maxAge:60*60*1000, path:"/"
    });
    res.cookie('userpw',result.data.userpw);
    res.cookie('useremail',result.data.useremail);
    res.cookie('usernumber',result.data.usernumber);

  }
  return result;
};

exports.Signin = async function(req,res){
  var result = await service_main.signin(req);
  var msg = "가입완료";
  if(result ==10000) {
      msg = "이미 존재하는 ID 입니다.";
  }
  var json = {code:result, msg:msg};
  console.log(json);
  return json;
};
