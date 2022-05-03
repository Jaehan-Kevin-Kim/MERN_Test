// @desc Get goals
// @route GET /api/goals
// @access Private
const getGoals = (req, res) => {
  res.status(200).json({
    message: "Get goals in controller",
  });
};

// @desc Set goal
// @route POST /api/goals
// @access Private
const setGoal = (req, res) => {
  console.log(req.body);
  res.status(200).json({
    message: `Create(Set) goal in contoller`,
  });
};

// @desc Update goal
// @route PUT /api/goals/:id
// @access Private
const updateGoal = (req, res) => {
  res.status(200).json({
    message: `Update goal ${req.params.id} in controller`,
  });
};

// @desc Delete goal
// @route DELETE /api/goals/:name
// @access Private
const deleteGoal = (req, res) => {
  res.status(200).json({
    message: `Delete goal ${req.params.name} in controller`,
  });
};
module.exports = {
  getGoals,
  setGoal,
  updateGoal,
  deleteGoal,
};
