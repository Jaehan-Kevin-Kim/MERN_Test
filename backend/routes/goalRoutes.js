const express = require("express");
const router = express.Router();
const {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
} = require("../controllers/goalController");

const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGoals).post(protect, setGoal);
// router.route("/:id").put(updateGoal).delete(deleteGoal);

router.route("/:id").put(protect, updateGoal).delete(protect, deleteGoal);
// router.route("/:name").delete(deleteGoal);

//GET /api/goals
// router.get("/", getGoals);
// router.get("/", (req, res) => {
//   res.status(200).json({
//     message: "Get goals in router module",
//   });
// });

//POST /api/goals
// router.post("/", postGoal);
// router.post("/", (req, res) => {
//   res.status(200).json({
//     message: "Create(Set) goal in router module",
//   });
// });

//PUT /api/goals/:id
// router.put(":/id", updateGoal);
// router.put("/:id", (req, res) => {
//   res.status(200).json({
//     message: `Update goal ${req.params.id} in router module `,
//   });
// });

//DELETE /api/goals/:name
// router.delete(":/name", deleteGoal);
// router.delete("/:name", (req, res) => {
//   res.status(200).json({
//     message: `Delete goal ${req.params.name} in router module`,
//   });
// });

module.exports = router;
