import React, {useEffect, useState} from "react";
import {
    addIngredient,
    deleteIngredient,
    fetchIngredients,
    updateIngredient,
} from "../services/api";
import IngredientForm from "../components/IngredientForm";
import IngredientTable from "../components/IngredientTable";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const IngredientsPage = () => {
    const [ingredients, setIngredients] = useState([]);
    const [editing, setEditing] = useState(null);
    const [pageSize, setPageSize] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");
    const [resetTrigger, setResetTrigger] = useState(false);
    const [toast, setToast] = useState({
        show: false,
        message: "",
        type: "success",
    });

    const showToast = (message, type = "success") => {
        setToast({show: true, message, type});
        setTimeout(
            () => setToast({show: false, message: "", type: "success"}),
            3000
        );
    };

    // Load ingredients
    const loadIngredients = async (search = "") => {
        const res = await fetchIngredients(search ? {search} : {});
        setIngredients(res.data);
    };

    useEffect(() => {
        loadIngredients();
    }, []);

    const handleSave = async (data) => {
        try {
            if (editing) {
                await updateIngredient(editing._id, data);
                showToast("Ingredient updated successfully!");
            } else {
                await addIngredient(data);
                showToast("Ingredient added successfully!");
            }
            setEditing(null);
            setResetTrigger((prev) => !prev);
            await loadIngredients(searchTerm);
        } catch (err) {
            showToast("Error saving ingredient", "danger");
        }
    };

    const handleDelete = async (id) => {
        try {
            await deleteIngredient(id);
            showToast("Ingredient deleted");
            await loadIngredients(searchTerm);
        } catch (err) {
            showToast("Error deleting ingredient", "danger");
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        await loadIngredients(searchTerm);
    };

    return (
        <div className="container py-4">
            <h2 className="mb-4">Ingredients</h2>

            {/* Search form */}
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

            <IngredientForm
                onSubmit={handleSave}
                onCancel={() => setEditing(null)}
                defaultValues={
                    editing || {name: "", unit: "", quantity: "", price: ""}
                }
                resetTrigger={resetTrigger}
            />
            <IngredientTable
                ingredients={ingredients}
                onEdit={(ingredient) => setEditing(ingredient)}
                onDelete={handleDelete}
                pageSize={pageSize}
                setPageSize={setPageSize}
            />
            {/* Toast Notification */}
            <ToastContainer position="bottom-end" className="p-3">
                <Toast bg={toast.type} show={toast.show} onClose={() => setToast({ show: false })}>
                    <Toast.Body className="text-white">{toast.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    );
};

export default IngredientsPage;
