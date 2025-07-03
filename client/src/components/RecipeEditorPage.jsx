// RecipeEditorPage.jsx
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import RecipeForm from "../components/RecipeForm";
import {addRecipe, getRecipe, updateRecipe} from "../services/api";

const RecipeEditorPage = () => {
    const navigate = useNavigate();
    const {id} = useParams(); // from /recipes/:id/edit
    const isEdit = Boolean(id);

    const [defaultValues, setDefaultValues] = useState(null);

    useEffect(() => {
        if (isEdit) {
            // fetch recipe details for editing
            getRecipe(id).then((res) => {
                const recipe = res.data;
                // Format it to match the RecipeForm expected structure
                const ingredients = recipe.ingredients.map((i) => ({
                    ingredientId: i.ingredient,
                    name: i.name,
                    unit: i.unit,
                    quantity: i.quantity,
                }));
                setDefaultValues({
                    name: recipe.name,
                    servings: recipe.servings,
                    ingredients,
                });
            });
        } else {
            setDefaultValues({name: "", servings: 1, ingredients: []});
        }
    }, [id]);

    const handleSubmit = async (data) => {
        const formatted = {
            name: data.name,
            servings: data.servings,
            multiplier: data.multiplier || 4,
            taxPercentage: data.taxPercentage || 0.08,
            packagingCost: data.packagingCost || 0.25,
            ingredients: data.ingredients.map((i) => ({
                ingredient: i.ingredientId,
                quantity: i.quantity,
            })),
        };

        if (isEdit) {
            await updateRecipe(id, formatted);
        } else {
            await addRecipe(formatted);
        }
        navigate("/recipes");
    };

    if (!defaultValues) return <div className="p-4">Loading...</div>;

    return (
        <RecipeForm
            onSubmit={handleSubmit}
            defaultValues={defaultValues}
        />
    );
};

export default RecipeEditorPage;
