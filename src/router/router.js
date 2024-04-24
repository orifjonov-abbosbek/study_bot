const express = require("express");
const router = express.Router();
const searchEngine = require("../../controller/controller");

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: API endpoints for managing questions
 *
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int64
 *         questionText:
 *           type: string
 *         answerText:
 *           type: string
 *       required:
 *         - id
 *         - questionText
 *         - answerText
 */

/**
 * @swagger
 * /api/questions/all:
 *   get:
 *     summary: Get all questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: List of all questions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal server error
 */
router.get("/questions/all", async (req, res) => {
  try {
    const questions = await searchEngine.getAllQuestions();
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Search questions by keyword
 *     tags: [Questions]
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         required: true
 *         description: Keyword to search for questions
 *     responses:
 *       200:
 *         description: List of questions matching the keyword
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Question'
 */

// Search questions by keyword
router.get("/questions", async (req, res) => {
  const { keyword } = req.query;
  try {
    const questions = await searchEngine.searchQuestions(keyword);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: New question created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Question'
 *       500:
 *         description: Internal server error
 */

// Create a new question
router.post("/questions", async (req, res) => {
  const { questionText, answerText } = req.body;
  try {
    const question = await searchEngine.createQuestion(
      questionText,
      answerText
    );
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/questions/{id}:
 *   put:
 *     summary: Update an existing question
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the question to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       204:
 *         description: Question updated successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */

// Update an existing question
router.put("/questions/:id", async (req, res) => {
  const { id } = req.params;
  const { questionText, answerText } = req.body;
  try {
    const updated = await searchEngine.updateQuestion(
      id,
      questionText,
      answerText
    );
    if (updated) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

/**
 * @swagger
 * /api/questions/{id}:
 *   delete:
 *     summary: Delete a question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the question to delete
 *     responses:
 *       204:
 *         description: Question deleted successfully
 *       404:
 *         description: Question not found
 *       500:
 *         description: Internal server error
 */

// Delete a question by ID
router.delete("/questions/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await searchEngine.deleteQuestion(id);
    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: "Question not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
