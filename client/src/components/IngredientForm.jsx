import React from "react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";

// Define schema
const schema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    unit: Yup.string().required("Unit is required"),
    quantity: Yup.number().required("Quantity is required"),
    price: Yup.number().required("Price is required"),
});

const IngredientForm = ({onSubmit, defaultValues}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors},
    } = useForm({defaultValues, resolver: yupResolver(schema)});

    React.useEffect(() => {
        reset(defaultValues);
    }, [defaultValues]);

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="mb-4"
        >
            <div className="row g-3">
                <div className="col">
                    <input {...register('name')} placeholder="Name" className="form-control"/>
                    <small className="text-danger">{errors.name?.message}</small>
                </div>
                <div className="col">
                    <input {...register('unit')} placeholder="Unit" className="form-control"/>
                    <small className="text-danger">{errors.unit?.message}</small>
                </div>
                <div className="col">
                    <input {...register('quantity')} placeholder="Quantity" className="form-control"/>
                    <small className="text-danger">{errors.quantity?.message}</small>
                </div>
                <div className="col">
                    <input {...register('price')} placeholder="Price" className="form-control"/>
                    <small className="text-danger">{errors.price?.message}</small>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-success">Save</button>
                </div>
            </div>
        </form>
    );
};

export default IngredientForm;
