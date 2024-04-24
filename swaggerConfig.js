const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Define Swagger configuration options
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Study Bot API",
      version: "1.0.0",
      description: "API documentation for Study Bot",
    },
    servers: [
      {
        url: "http://localhost:3000", // Update the URL to match your server's URL
        description: "Development server",
      },
    ],
  },
  apis: ["./src/router/router*.js"], // Specify the path to your route files
};

// Initialize Swagger-jsdoc
const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
