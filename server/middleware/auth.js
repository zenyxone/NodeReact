const req = require("express/lib/request");
const { process_params } = require("express/lib/router");
const { User } = require("../models/User");

let auth = (req, res, next) => {
  // 인증 처리

  // 클라이언트 쿠키에서 토큰 가져옴 cookie-parser
  let token = req.cookies.x_auth;
  //let token = req.cookies["x_auth"];

  // 토큰을 복호화 한후 유저를 찾는다
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user) return res.json({ isAuth: false, err: true });

    req.token = token;
    req.user = user;

    next();
  });
};

module.exports = { auth };
