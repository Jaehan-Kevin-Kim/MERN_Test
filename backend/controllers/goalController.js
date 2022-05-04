const asyncHandler = require("express-async-handler");

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get goals in controller",
  });
});

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  // console.log(req.body);

  if (!req.body.text) {
    console.log(req.body);
    console.log("true");
    // res.status(400).json({ error: "Please add a text field" });
    res.status(400);
    throw new Error("Please add a text field");
  }

  res.status(200).json({
    message: `Create(Set) goal in contoller`,
  });
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Update goal ${req.params.id} in controller`,
  });
});

// @desc Delete goal
// @route DELETE /api/goals/:name
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: `Delete goal ${req.params.name} in controller`,
  });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
