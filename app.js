const express = require("express");
const sequelize = require("./database/connection"); // Import sequelize
const routes = require("./router/router"); // Import routes
const { specs, swaggerUi } = require("./swaggerConfig");

// Check if sequelize is connected
sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

const app = express();

app.use(express.json());

// Use routes
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
