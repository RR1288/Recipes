import {useEffect, useState} from "react";
import {fetchIngredients} from "../services/api";
import {useForm, useFieldArray} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

// Define schema
const schema = Yup.object().shape({
    name: Yup.string().required("Recipe name is required"),
    servings: Yup.number()
        .required("Servings are required")
        .min(1, "Servings must be at least 1"),
    ingredients: Yup.array()
        .of(
            Yup.object().shape({
                ingredientId: Yup.string().required("Ingredient is required"),
                quantity: Yup.number()
                    .required("Quantity is required")
                    .min(0, "Quantity must be greater than 0"),
            })
        )
        .min(1, "At least one ingredient is required"),
});

const RecipeForm = ({
    onSubmit,
    defaultValues = {name: "", servings: 1, ingredients: []},
}) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);
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

    const {
        register,
        control,
        handleSubmit,
        setValue,
        getValues,
        watch,
        formState: {errors},
    } = useForm({defaultValues, resolver: yupResolver(schema)});

    const {fields, append, remove} = useFieldArray({
        control,
        name: "ingredients",
    });

    useEffect(() => {
        const search = async () => {
            if (!searchTerm) return setSearchResults([]);
            const res = await fetchIngredients({search: searchTerm});
            setSearchResults(res.data);
        };
        search();
    }, [searchTerm]);

    const addIngredient = (ingredient) => {
        const exists = getValues("ingredients").find(
            (i) => i.ingredientId === ingredient._id
        );
        if (!exists) {
            append({
                ingredientId: ingredient._id,
                name: ingredient.name,
                unit: ingredient.unit,
                quantity: 0,
            });
        }
        setSearchTerm("");
        setSearchResults([]);
    };

    const wrappedSubmit = async (data) => {
        try {
            await onSubmit(data);
            showToast("Recipe saved successfully!");
        } catch (err) {
            showToast("Failed to save recipe", "danger");
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSubmit(wrappedSubmit)}>
            <div className="container py-4">
                <div className="col">
                    <input
                        {...register("name")}
                        placeholder="Recipe Name"
                        className="form-control"
                    />
                    <small className="text-danger">
                        {errors.name?.message}
                    </small>
                </div>
                <div className="col">
                    <input
                        type="number"
                        {...register("servings")}
                        className="form-control"
                        placeholder="Servings"
                    />
                    <small className="text-danger">
                        {errors.servings?.message}
                    </small>
                </div>
                <div className="mb-3">
                    <input
                        className="form-control"
                        placeholder="Search ingredients..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchResults.length > 0 && (
                        <ul className="list-group mt-1">
                            {searchResults.map((item) => (
                                <li
                                    className="list-group-item list-group-item-action"
                                    key={item._id}
                                    onClick={() => addIngredient(item)}
                                >
                                    {item.name} ({item.unit})
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="mb-3">
                    <h5>Ingredients</h5>
                    {fields.map((item, index) => (
                        <div
                            key={item.id}
                            className="row mb-2"
                        >
                            <div className="col-5">
                                {item.name} ({item.unit})
                                <input
                                    type="hidden"
                                    {...register(
                                        `ingredients.${index}.ingredientId`
                                    )}
                                />
                                <input
                                    type="hidden"
                                    {...register(`ingredients.${index}.name`)}
                                />
                                <input
                                    type="hidden"
                                    {...register(`ingredients.${index}.unit`)}
                                />
                            </div>
                            <div className="col">
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register(
                                        `ingredients.${index}.quantity`
                                    )}
                                    className="form-control"
                                />
                                <small className="text-danger">
                                    {
                                        errors.ingredients?.[index]
                                            ?.quantity?.message
                                    }
                                </small>
                            </div>
                            <div className="col-auto">
                                <button
                                    type="button"
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => remove(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                    {typeof errors.ingredients?.message === "string" && (
                        <div className="text-danger">
                            {errors.ingredients?.message}
                        </div>
                    )}
                </div>
                <button
                    className="btn btn-primary"
                    type="submit"
                >
                    Save Recipe
                </button>
                {/* Toast Notification */}
                <ToastContainer
                    position="bottom-end"
                    className="p-3"
                >
                    <Toast
                        bg={toast.type}
                        show={toast.show}
                        onClose={() => setToast({show: false})}
                    >
                        <Toast.Body className="text-white">
                            {toast.message}
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </div>
        </form>
    );
};

export default RecipeForm;
