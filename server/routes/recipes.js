const express = require("express");
const router = express.Router();
const {createRecipe, getRecipes, getRecipe, updateRecipe} = require("../controllers/recipeController");

/**
 * @swagger
 * tags:
 *   name: Recipes
 *   description: Recipe management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Recipe:
 *       type: object
 *       required:
 *         - name
 *         - servings
 *         - ingredients
 *         - packagingCost
 *         - multiplier
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         servings:
 *           type: number
 *         packagingCost:
 *           type: string
 *         multiplier:
 *           type: number
 *         ingredients:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Ingredient'
 *             
 *       example:
 *         id: 68660b5fa0c0cea5a3f2ace7
 *         name: Pionono
 *         servings: 100
 *         taxPercentage: 0.08
 *         multiplier: 4
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
 */

router.post("/", createRecipe);
/**
 * @swagger
 * /api/recipes:
 *   get:
 *     summary: Get all recipes or search by name
 *     tags: [Recipes]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search ingredients by name (case-insensitive)
 *     responses:
 *       200:
 *         description: List of recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       500:
 *         description: Internal server error
 */
router.get("/", getRecipes);

/**
 * @swagger
 * /api/recipes/{id}:
 *   get:
 *     summary: Get a single recipe by ID
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Recipe found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */

router.get("/:id", getRecipe);


/**
 * @swagger
 * /api/recipes/{id}:
 *   put:
 *     summary: Update a recipe
 *     tags: [Recipes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Recipe ID
 *         schema:
 *           type: string
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *             $ref: '#/components/schemas/Recipe'
 *     responses:
 *       200:
 *         description: Recipe found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Recipe not found
 */

router.put("/:id", updateRecipe);

module.exports = router;
