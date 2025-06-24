const Recipe = require('../models/Recipe');
const Ingredient = require('../models/Ingredient');

exports.createRecipe = async (req, res) => {
  try {
    const recipeData = req.body;

    // Calculate total cost
    let totalCost = 0;
    for (const item of recipeData.ingredients) {
      const ingredient = await Ingredient.findById(item.ingredient);
      totalCost += ingredient.pricePerUnit * item.quantityUsed;
    }

    const costPerServing = totalCost / recipeData.servings;
    const basePrice = costPerServing * recipeData.multiplier;
    const tax = basePrice * (recipeData.taxPercentage / 100);
    const finalPricePerUnit = basePrice + tax + recipeData.packagingCost;

    const recipe = new Recipe(recipeData);
    await recipe.save();

    res.status(201).json({
      recipe,
      costSummary: {
        totalCost,
        costPerServing,
        suggestedPricePerUnit: finalPricePerUnit
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients.ingredient');
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
