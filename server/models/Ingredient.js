const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
    name: {type: String, required: true},
    // TODO: Add unit conversion
    unit: {type: String, required: true}, // e.g., lb, g, ml, pcs
    quantity: {type: Number, required: true}, //e.g., 5
    price: {type: Number, required: true}, // e.g., 3.5
    pricePerUnit: {type: Number, required: true}, // e.g., 3.5 / 5 = 0.70
});

module.exports = mongoose.model('Ingredient', IngredientSchema);