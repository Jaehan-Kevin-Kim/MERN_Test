const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5001;
const app = express();
const goalRouter = require("./routes/goalRoutes");

app.use("/api/goals", goalRouter);

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
