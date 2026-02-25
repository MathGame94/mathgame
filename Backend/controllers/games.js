const { pool } = require("../models/db");

/* ✅ SAVE SCORE */
const saveScore = async (req, res) => {
  const { userId, operation, score } = req.body;

  try {
    await pool.query(
      `INSERT INTO game_sessions (user_id, operation, score)
       VALUES ($1, $2, $3)`,
      [userId, operation, score]
    );

    res.status(201).json({ message: "Score saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* ❌ SAVE WRONG ANSWER */
const saveWrongAnswer = async (req, res) => {
  const {
    userId,
    operation,
    num1,
    num2,
    correctAnswer,
    userAnswer,
  } = req.body;

  try {
    await pool.query(
      `INSERT INTO wrong_answers
      (user_id, operation, num1, num2, correct_answer, user_answer)
      VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, operation, num1, num2, correctAnswer, userAnswer]
    );

    res.status(201).json({ message: "Wrong answer saved" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* 📊 ANALYZE WEAK AREAS */
const getWeakOperations = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `
      SELECT operation, COUNT(*) AS mistakes
      FROM wrong_answers
      WHERE user_id = $1
      GROUP BY operation
      ORDER BY mistakes DESC
      `,
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  saveScore,
  saveWrongAnswer,
  getWeakOperations,
};
