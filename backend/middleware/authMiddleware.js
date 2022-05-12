const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  // JWT가 header로 전달이 되기 때문에, 아래와 같이 request.header를 체크 하기
  // 아래와 같이 조건문을 startsWith('Bearer')로 해 주는 이유는 authorization header에서 token이 전달 될 때 형태가 'Bearer sdfafasdfsdf'이기 때문임. ('Bearer 토큰')
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1]; // 이게 위에서 기재 한 바와 같이 'Bearer 토큰' 형태로 저장이 되어있기 때문에, split(' ') 로 위 bearer와 토큰 사이의 공백을 기준으로 array두개로 나누고, 그 중 두번째 (토큰이 기재된) array 값을 가져오는 코드

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from the token

      req.user = await User.findById(decoded.id).select("-password"); //.select('-password') 를 해 주는 이유는 비록 hashed password이긴 하지만, password를 제외 한 값을 가져오기 위해서 추가로 넣어준 부분 코드임.

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

module.exports = { protect };
