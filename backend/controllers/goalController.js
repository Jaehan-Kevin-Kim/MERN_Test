const asyncHandler = require("express-async-handler");

const Goal = require("../models/goalModel");

// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = asyncHandler(async (req, res) => {
  const goals = await Goal.find({ user: req.user.id }); // .find()는 모든 값을 찾는 method
  res.status(200).json(goals);

  // res.status(200).json({
  //   message: "Get goals in controller",
  // });
});

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    console.log(req.body);
    console.log("true");
    // res.status(400).json({ error: "Please add a text field" });
    res.status(400);
    throw new Error("Please add a text field");
  }

  // 아래는 goalCollection 안에 하나의 값을 생성 하는 코드
  const goal = await Goal.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(goal);
});

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }

  const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    // 위 new: true 옵션은 만약 해당 id를 가진 goal이 없는 경우, 자동으로 생성해주는 옵션임.
  });

  res.status(200).json(updatedGoal);
});

// @desc Delete goal
// @route DELETE /api/goals/:name
// @access Private
const deleteGoal = asyncHandler(async (req, res) => {
  const goal = await Goal.findById(req.params.id);

  if (!goal) {
    res.status(400);
    throw new Error("Goal not found");
  }
  await goal.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
