const Ingredient = require('../models/Ingredient');

exports.createIngredient = async (req, res) => {
  try {
    const { name, unit, quantity, price } = req.body;

    if (!name || !unit || !quantity || !price) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // TODO: Validate fields

    const pricePerUnit = price / quantity;

    const ingredient = new Ingredient({
      name,
      unit,
      quantity,
      price,
      pricePerUnit
    });

    await ingredient.save();
    res.status(201).json(ingredient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.json(ingredients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
