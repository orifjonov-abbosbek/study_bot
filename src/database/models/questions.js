const { DataTypes } = require("sequelize");
const sequelize = require("../connection");

const Question = sequelize.define(
  "Question",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    questionText: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Question text is required",
        },
        notEmpty: {
          msg: "Question text cannot be empty",
        },
      },
    },
    answerText: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Answer text is required",
        },
        notEmpty: {
          msg: "Answer text cannot be empty",
        },
      },
    },
  },
  {
    // Define model options
    timestamps: true, // Enable timestamps (createdAt, updatedAt)
  }
);

// Sync the model with the database
(async () => {
  try {
    await Question.sync(); // Create the "Questions" table if it doesn't exist
    console.log("Question model synchronized with database");
  } catch (error) {
    console.error("Error synchronizing Question model with database:", error);
  }
})();

module.exports = Question;
