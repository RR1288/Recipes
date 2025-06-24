const Ingredient = require("../models/Ingredient");

exports.createIngredient = async (req, res) => {
    try {
        const {name, unit, quantity, price} = req.body;

        if (!name || !unit || !quantity || !price) {
            return res.status(400).json({error: "All fields are required"});
        }

        // TODO: Validate fields

        const pricePerUnit = price / quantity;

        const ingredient = new Ingredient({
            name,
            unit,
            quantity,
            price,
            pricePerUnit,
        });

        await ingredient.save();
        res.status(201).json(ingredient);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
};

exports.getIngredients = async (req, res) => {
    try {
        const query = req.query.search
            ? {name: {$regex: new RegExp(req.query.search, "i")}}
            : {};
        const ingredients = await Ingredient.find(query).sort({name: 1});
        res.json(ingredients);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.getIngredient = async (req, res) => {
    try {
        const ingredient = await Ingredient.findById(req.params.id);
        res.json(ingredient);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.updateIngredient = async (req, res) => {
    const {name, quantity, unit, price} = req.body;

    if (!quantity || !price) {
        return res.status(400).json({
            error: "Quantity and price are required to calculate pricePerUnit",
        });
    }
    const pricePerUnit = price / quantity;
    const updateData = {
        name,
        quantity,
        unit,
        price,
        pricePerUnit,
    };
    try {
        const updated = await Ingredient.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        );
        if (!updated) {
            return res.status(404).json({error: "Ingredient not found"});
        }
        res.json(updated);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};

exports.deleteIngredient = async (req, res) => {
    try {
        const deleted = await Ingredient.findByIdAndDelete(req.params.id);
        if (!deleted) {
            return res.status(404).json({error: "Ingredient not found"});
        }
        res.json(deleted);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
};
