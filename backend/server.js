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
