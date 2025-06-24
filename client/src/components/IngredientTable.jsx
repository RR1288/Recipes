import * as React from "react";
import {DataGrid} from "@mui/x-data-grid";

const IngredientTable = ({
    ingredients,
    onEdit,
    onDelete,
    pageSize,
    setPageSize,
}) => {
    const columns = [
        {field: "name", headerName: "Name", flex: 1},
        {field: "unit", headerName: "Unit", flex: 1},
        {field: "quantity", headerName: "Quantity", type: "number", flex: 1},
        {field: "price", headerName: "Price", type: "number", flex: 1},
        {
            field: "pricePerUnit",
            headerName: "Price/Unit",
            type: "number",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            renderCell: ({row}) => (
                <>
                    <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => onEdit(row)}
                    >
                        Edit
                    </button>
                    <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => onDelete(row._id)}
                    >
                        Delete
                    </button>
                </>
            ),
            flex: 1.2,
        },
    ];
    return (
        <DataGrid
            rows={ingredients}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={pageSize}
            onPageSizeChange={(newSize) => setPageSize(newSize)}
            rowsPerPageOptions={[10, 50, 100, 150]}
            pagination
        />
    );
};

export default IngredientTable;
