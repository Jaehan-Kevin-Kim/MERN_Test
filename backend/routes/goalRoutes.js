const express = require("express");
const router = express.Router();

//GET /api/goals
router.get("/", (req, res) => {
  res.status(200).json({
    message: "Get goals in router module",
  });
});

//POST /api/goals
router.post("/", (req, res) => {
  res.status(200).json({
    message: "Create(Set) goal in router module",
  });
});

//PUT /api/goals/:id
router.put("/:id", (req, res) => {
  res.status(200).json({
    message: `Update goal ${req.params.id} in router module `,
  });
});

//DELETE /api/goals/:name
router.delete("/:name", (req, res) => {
  res.status(200).json({
    message: `Delete goal ${req.params.name} in router module`,
  });
});

module.exports = router;
