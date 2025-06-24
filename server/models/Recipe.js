const mongoose = require('mongoose');
const Ingredient = require('./Ingredient');

const RecipeIngredientSchema = new mongoose.Schema({
    ingredient: {type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true},
    quantity: {type: Number, required: true}
});

const RecipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    servings: { type: Number, required: true },
    ingredients: [RecipeIngredientSchema],
    taxPercentage: { type: Number, default: 0.08 },
    packagingCost: { type: Number, default: 0 },
    multiplier: { type: Number, default: 4 }
});

module.exports = mongoose.model('Recipe', RecipeSchema);