/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management
 */

/**
 * @swagger
 * /api/recipes:
 *   post:
 *     summary: Add a new recipe
 *     tags: [Recipes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - servings
 *               - ingredients
 *             properties:
 *               name:
 *                 type: string
 *               servings:
 *                 type: number
 *               multiplier:
 *                 type: number
 *               taxPercentage:
 *                 type: number
 *               packagingCost:
 *                 type: number
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - ingredient
 *                     - quantity
 *                   properties:
 *                     ingredient:
 *                       type: string
 *                       description: Ingredient ID
 *                     quantity:
 *                       type: number
 *     responses:
 *       201:
 *         description: Recipe created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all recipes
 *     tags: [Recipes]
 *     responses:
 *       200:
 *         description: List of recipes
 *       500:
 *         description: Internal server error
 */

const express = require("express");
const router = express.Router();
const {createRecipe, getRecipes} = require("../controllers/recipeController");

router.post("/", createRecipe);
router.get("/", getRecipes);

module.exports = router;
