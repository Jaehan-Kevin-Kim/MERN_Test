const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

// @desc Register new user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log(hashedPassword);

  //Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });
  console.log(user);

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }

  res.json({
    message: "Register User",
  });
});

// @desc Authenticate a user
// @route POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Check for user email (해당 email이 있는 user가 있는지 먼저 파악)
  const user = await User.findOne({ email });

  // User가 있는 경우 입력한 password가 맞는지 확인 하는 부분 (해당 password를 다시 salt, hash로 만들어 비교할 필요 없이 compare이라는 method를 사용 하면 됨)
  if (user && (await bcrypt.compare(password, user.password))) {
    // password는 지금 user가 입력한 password이고, user는 db에 hashed 형태로 저장된 해당 user의 password임.
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

// @desc Get user user
// @route GET /api/users/me
// @access Public
const getMe = asyncHandler(async (req, res) => {
  res.json({
    message: "User data display",
  });
});

// Generate JWT (JWT 생성하는 method)
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: "30d",
//   });
// };

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
