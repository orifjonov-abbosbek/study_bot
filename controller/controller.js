//Controller.js
const Question = require("../database/models/questions");
const { Op } = require("sequelize");



// Function to search for questions by keyword
async function searchQuestions(keyword) {
  try {
    const questions = await Question.findAll({
      where: {
        [Op.or]: [
          { questionText: { [Op.like]: `%${keyword}%` } },
          { answerText: { [Op.like]: `%${keyword}%` } },
        ],
      },
    });
    return questions;
  } catch (error) {
    console.error("Error searching questions:", error);
    throw error;
  }
}


// Function to create a new question
async function createQuestion(questionText, answerText) {
  try {
    const question = await Question.create({ questionText, answerText });
    return question;
  } catch (error) {
    console.error("Error creating question:", error);
    throw error;
  }
}

// Function to update an existing question
async function updateQuestion(id, questionText, answerText) {
  try {
    const [updatedRows] = await Question.update(
      { questionText, answerText },
      { where: { id } }
    );
    return updatedRows > 0;
  } catch (error) {
    console.error("Error updating question:", error);
    throw error;
  }
}





// Function to delete a question by ID
async function deleteQuestion(id) {
  try {
    const deletedRows = await Question.destroy({ where: { id } });
    return deletedRows > 0;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw error;
  }
}

async function getAllQuestions() {
  try {
    const questions = await Question.findAll();
    return questions;
  } catch (error) {
    console.error("Error getting all questions:", error);
    throw error;
  }
}

module.exports = {
  searchQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getAllQuestions,
};