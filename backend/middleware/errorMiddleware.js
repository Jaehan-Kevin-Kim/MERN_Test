const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode);

  //아래 stack과 관련된 ternary operator는 'production'모드일때, 'development' 모드일때를 구분해서 정보를 넘겨줄지 말지를 정의하는 코드 임.
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

module.exports = { errorHandler };
