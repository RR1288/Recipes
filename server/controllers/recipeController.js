const Recipe = require("../models/Recipe");
const Ingredient = require("../models/Ingredient");

const enrich = async (items) => {
    let totalCost = 0;
    const enrichedIngredients = await Promise.all(
        items.map(async (item) => {
            const ingredient = await Ingredient.findById(item.ingredient);
            if (!ingredient) {
                throw new Error(`Ingredient not found: ${item.ingredient}`);
            }

            const cost = ingredient.pricePerUnit * item.quantity;
            totalCost += cost;

            return {
                ingredient: ingredient._id,
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: item.quantity,
            };
        })
    );
    return {enrichedIngredients, totalCost};
};

exports.createRecipe = async (req, res) => {
    try {
        const recipeData = req.body;

        const multiplier = recipeData.multiplier || 4;
        const taxPercentage = recipeData.taxPercentage || 8;
        const packagingCost = recipeData.packagingCost || 0.25;

        const {enrichedIngredients, totalCost} = await enrich(
            recipeData.ingredients
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
            packagingCost,
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
        const query = req.query.search
            ? {name: {$regex: new RegExp(req.query.search, "i")}}
            : {};
        const recipes = await Recipe.find(query).sort({name: 1}).populate('ingredients.ingredient');
        res.json(recipes);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.getRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        res.json(recipe);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.updateRecipe = async (req, res) => {
    const {
        name,
        servings,
        multiplier,
        taxPercentage,
        packagingCost,
        ingredients,
    } = req.body;
    const {id} = req.params;

    const {enrichedIngredients, totalCost} = await enrich(ingredients);

    const updateData = {
        name,
        servings,
        multiplier,
        taxPercentage,
        packagingCost,
        ingredients: enrichedIngredients,
    };
    try {
        const updated = await Recipe.findByIdAndUpdate(id, updateData, {
            new: true,
        });
        if (!updated) return res.status(404).json({error: "Recipe not found"});
        res.json({
            recipe: updated,
            costSummary: {
                totalCost,
                costPerServing: totalCost / servings,
                suggestedPricePerUnit:
                    (totalCost / servings) * multiplier +
                    (totalCost / servings) *
                        multiplier *
                        (taxPercentage / 100) +
                    packagingCost,
            },
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
