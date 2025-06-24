import React, {useEffect, useState} from "react";
import {
    addIngredient,
    deleteIngredient,
    fetchIngredients,
    updateIngredient,
} from "../services/api";
import IngredientForm from "../components/IngredientForm";
import IngredientTable from "../components/IngredientTable";

const IngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [editing, setEditing] = useState(null);
    const [pageSize, setPageSize] = useState(10);

    // Load ingredients
    const loadIngredients = async () => {
        const res = await fetchIngredients();
        setIngredients(res.data);
    };

    useEffect(() => {
        loadIngredients();
    }, []);

    const handleSave = async (data) => {
        if (editing) {
            await updateIngredient(editing._id, data);
        } else {
            await addIngredient(data);
        }
        setEditing(null);
        await loadIngredients();
    };

    const handleDelete = async (id) => {
        await deleteIngredient(id);
        await loadIngredients();
    };

    return (
        <div className="container py-4">
            <h2>Ingredients</h2>
            <IngredientForm
                onSubmit={handleSave}
                defaultValue={
                    editing || {name: "", unit: "", quantity: "", price: ""}
                }
            />
            <IngredientTable
                ingredients={ingredients}
                onEdit={(ingredient) => setEditing(ingredient)}
                onDelete={handleDelete}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
        </div>
    );
};

export default IngredientsPage;