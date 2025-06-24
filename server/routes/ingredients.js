const express = require("express");
const router = express.Router();
const {
    createIngredient,
    getIngredients,
    getIngredient,
    updateIngredient,
    deleteIngredient,
} = require("../controllers/ingredientController");

/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredient management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Ingredient:
 *       type: object
 *       required:
 *         - name
 *         - unit
 *         - quantity
 *         - price
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         quantity:
 *           type: number
 *         unit:
 *           type: string
 *         price:
 *           type: number
 *       example:
 *         id: 1
 *         name: Sugar
 *         quantity: 1000
 *         unit: grams
 *         price: 3.50
 */

/**
 * @swagger
 * /api/ingredients:
 *   post:
 *     summary: Add a new ingredient
 *     tags: [Ingredients]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       201:
 *         description: Ingredient created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post("/", createIngredient);

/**
 * @swagger
 * /api/ingredients:
 *   get:
 *     summary: Get all ingredients or search by name
 *     tags: [Ingredients]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search ingredients by name (case-insensitive)
 *     responses:
 *       200:
 *         description: List of ingredients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Ingredient'
 *       500:
 *         description: Internal server error
 */

router.get("/", getIngredients);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   get:
 *     summary: Get a single ingredient by ID
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ingredient ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredient found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 */

router.get("/:id", getIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   put:
 *     summary: Update an ingredient
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ingredient ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Ingredient'
 *     responses:
 *       200:
 *         description: Ingredient updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Ingredient'
 *       404:
 *         description: Ingredient not found
 */
router.put("/:id", updateIngredient);

/**
 * @swagger
 * /api/ingredients/{id}:
 *   delete:
 *     summary: Delete an ingredient
 *     tags: [Ingredients]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Ingredient ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Ingredient deleted successfully
 *       404:
 *         description: Ingredient not found
 */
router.delete("/:id", deleteIngredient);

module.exports = router;
