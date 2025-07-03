import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import ToastContainer from "react-bootstrap/esm/ToastContainer";
import Toast from "react-bootstrap/Toast";

import {deleteRecipe, fetchRecipes} from "../services/api";
import RecipeTable from "../components/RecipeTable";

const RecipesPage = () => {
    const [recipes, setRecipes] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [pageSize, setPageSize] = useState(10);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const navigate = useNavigate();

    const showToast = (message, type = "success") => {
        setToast({show: true}, message, type);
        setTimeout(
            () => setToast({show: false, message: "", type: "success"}),
            3000
        );
    };

    const enrichRecipes = (recipes) => {
        return recipes.map((recipe) => {
            const totalCost = recipe.ingredients.reduce((sum, item) => {
                const pricePerUnit = item.ingredient?.pricePerUnit || 0;
                return sum + pricePerUnit * item.quantity;
            }, 0);

            console.log(totalCost);
            

            const costPerServing = totalCost / recipe.servings;
            const basePrice = costPerServing * recipe.multiplier;
            const finalPrice = basePrice + recipe.packagingCost;

            return {
                ...recipe,
                cost: costPerServing.toFixed(2),
                price: finalPrice.toFixed(2),
            };
        });
    };

    const loadRecipes = async (search = "") => {
        const res = await fetchRecipes(search ? {search} : {});
        const enriched = enrichRecipes(res.data);
        setRecipes(enriched);
    };

    useEffect(() => {
        loadRecipes();
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();
        await loadRecipes(searchTerm);
    };

    const handleDelete = async (id) => {
        try {
            await deleteRecipe(id);
            showToast("Recipe deleted");
            await loadRecipes(searchTerm);
        } catch (err) {
            showToast("Error deleting recipe", "danger");
        }
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Recipes</h2>

            {/* Serch form */}
            <form
                className="row g-2 mb-3"
                onSubmit={handleSearch}
            >
                <div className="col-auto">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-auto">
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Search
                    </button>
                </div>
            </form>
            <button
                type="button"
                className="btn btn-success"
                onClick={() => navigate("/recipes/new")}
            >
                Add new recipe
            </button>

            <RecipeTable
                recipes={recipes}
                onEdit={(recipe) => navigate(`/recipes/${recipe._id}/edit`)}
                onDelete={handleDelete}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />

            {/* Toast Notification  */}
            <ToastContainer
                position="bottom-end"
                className="p-3"
            >
                <Toast
                    bg={toast.type}
                    show={toast.show}
                    onChange={() => setToast({show: false})}
                >
                    <Toast.Body className="text-white">
                        {toast.message}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default RecipesPage;
