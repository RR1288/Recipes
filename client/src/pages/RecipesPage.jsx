import {useEffect, useState} from "react";
import ToastContainer from "react-bootstrap/esm/ToastContainer";
import Toast from "react-bootstrap/Toast";

import { deleteRecipe, fetchRecipes } from "../services/api";
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

    const showToast = (message, type = "success") => {
        setToast({show: true}, message, type);
        setTimeout(
            () => setToast({show: false, message: "", type: "success"}),
            3000
        );
    };

    const loadRecipes = async (search = "") => {
        const res = await fetchRecipes(search ? {search} : {});
        setRecipes(res);
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
                    <button type="submit" className="btn btn-primary">Search</button>
                </div>
            </form>

            <RecipeTable 
                recipes={recipes}
                onEdit={(recipe) => setEditing(recipe)} // TODO
                onDelete={handleDelete}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />

            {/* Toast Notification  */}
            <ToastContainer position="bottom-end" className="p-3">
                <Toast bg={toast.type} show={toast.show} onChange={()=>setToast({show:false})}>
                    <Toast.Body className="text-white">{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default RecipesPage;
