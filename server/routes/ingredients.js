/**
 * @swagger
 * tags:
 *   name: Ingredients
 *   description: Ingredient management
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
 *             type: object
 *             required:
 *               - name
 *               - unit
 *               - quantity
 *               - price
 *             properties:
 *               name:
 *                 type: string
 *               unit:
 *                 type: string
 *               quantity:
 *                 type: number
 *               price:
 *                 type: number
 *     responses:
 *       201:
 *         description: Ingredient created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 *
 *   get:
 *     summary: Get all ingredients
 *     tags: [Ingredients]
 *     responses:
 *       200:
 *         description: List of ingredients
 *       500:
 *         description: Internal server error
 */

const express = require('express');
const router = express.Router();
const { createIngredient, getIngredients } = require('../controllers/ingredientController');

router.post('/', createIngredient);
router.get('/', getIngredients);

module.exports = router;
