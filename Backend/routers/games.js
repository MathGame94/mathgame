const express = require("express");
const {
  saveScore,
  saveWrongAnswer,
  getWeakOperations,
} = require("../controllers/gameController");

const gameRouter = express.Router();

gameRouter.post("/score", saveScore);
gameRouter.post("/wrong-answer", saveWrongAnswer);
gameRouter.get("/weak-areas/:userId", getWeakOperations);

module.exports = gameRouter;
