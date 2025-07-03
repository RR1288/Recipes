const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");

exports.createRecipe = async (req, res) => {
    try {
        const recipeData = req.body;
        console.log(recipeData);
        

        const multiplier = recipeData.multiplier || 4;
        const taxPercentage = recipeData.taxPercentage || 8;
        const packagingCost = recipeData.packagingCost || 0.25;

        // Calculate total cost
        let totalCost = 0;
      
        const enrichedIngredients = await Promise.all(
          recipeData.ingredients.map(async (item) => {
            const ingredient = await Ingredient.findById(item.ingredient);
            if(!ingredient) {
              throw new Error(`Ingredient not found: ${item.ingredient}`);
              
            }

            const cost = ingredient.pricePerUnit * item.quantity;
            totalCost += cost;

            return {
              ingredient: ingredient._id,
              name: ingredient.name,
              unit: ingredient.unit,
              quantity: item.quantity
            }
          })
        );

        const costPerServing = totalCost / recipeData.servings;
        const basePrice = costPerServing * multiplier;
        const tax = basePrice * (taxPercentage / 100);
        const finalPricePerUnit = basePrice + tax + packagingCost;

        const recipe = new Recipe({
          ...recipeData,
          ingredients: enrichedIngredients,
          multiplier,
          taxPercentage,
          packagingCost
        });
        await recipe.save();

        res.status(201).json({
            recipe,
            costSummary: {
                totalCost,
                costPerServing,
                suggestedPricePerUnit: finalPricePerUnit,
            },
        });
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.getRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.find().populate("ingredients.ingredient");
        res.json(recipes);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
