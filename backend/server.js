const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5001;

const app = express();
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/users", userRouter);
app.use("/api/goals", goalRouter);

// Serve frontend (Frontend 연결을 위해 build가 된 frontend에 (build > index.html) 접근 할 수 있도록 설정 해 줌.)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/build"))); // frontend > build 폴더에 접근 하게 해 줌
  app.get(
    "*",
    (
      req,
      res, // frontend의 index.html 에 접근하게 해주는 코드
    ) =>
      res.sendFile(
        path.resolve(__dirname, "../", "frontend", "build", "index.html"),
      ),
  );
} else {
  app.get("/", (req, res) => {
    res.send("Please set to production");
  });
}

app.use(errorHandler);

// app.get("/api/goals", (req, res) => {
//   //   res.send("Get goals");

//   //   res.json({
//   //     message: "Get goals",
//   //   });

//   res.status(200).json({
//     message: "Get goals",
//   });
// });

app.listen(port, () => console.log(`Server started on part ${port}`));
