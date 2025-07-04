const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const {swaggerUi, swaggerSpec} = require("./swagger");

require("dotenv").config();

// Define routes
const ingredientRoutes = require("./routes/ingredients");
const recipeRoutes = require("./routes/recipes");

const app = express();
app.use(cors());
app.use(express.json());

// Add API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Add routes
app.use("/api/ingredients", ingredientRoutes);
app.use("/api/recipes", recipeRoutes);

// Connect DB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(process.env.PORT, () => {
            console.log(`Server running on port ${process.env.PORT}`);
        });
    })
    .catch((err) => console.error(err));
