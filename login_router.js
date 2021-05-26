const path = require("path");
var express = require("express");
const http = require('http');
const mysql = require('mysql');
var router = express.Router();
var controller_main = require("../controllers/login-controller");

router.get("/login", function(req,res){
  res.sendFile(path.join(__dirname , "../public/login.html"));
});

router.post("/login", async function(req,res){
  var result = await controller_main.SignIn(req,res);
  res.send(result);
});

router.get("/logout", function(req,res){
  console.log("clear cookie");

res.clearCookie('userid');
res.clearCookie('username');
res.clearCookie('usernumber');
res.clearCookie('useremail');
res.clearCookie('userpw');

console.log("destroy session");
req.session.destroy();
res.sendFile(path.join(__dirname , "../public/login.html"));
});

router.get("/signup", function(req,res){
  res.sendFile(path.join(__dirname , "../public/signin.html"));
});
router.post("/Signin", async function(req,res){

  var result = await
  controller_main.SignUp(req,res);
  res.send(result);
});

module.exports = router;
