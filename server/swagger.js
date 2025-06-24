const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerDefinition = {
    openapi: "3.0.0",
    info: {
        title: "Recipe Cost Calculator API",
        version: "1.0.0",
        description: "API documentation for the Recipe Cost Calculator app",
    },
    servers: [
        {
            url: "http://localhost:5000",
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ["./routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {swaggerUi, swaggerSpec};
