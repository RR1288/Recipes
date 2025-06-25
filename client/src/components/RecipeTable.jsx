import * as React from "react";
import {DataGrid} from "@mui/x-data-grid";

const RecipeTable = ({
    recipes,
    onEdit,
    onDelete,
    pageSize,
    setPageSize,
}) => {
    const columns = [
        {field: "name", headerName: "Name", flex: 1},
        {field: "servings", headerName: "Servings", flex: 1},
        {field: "cost", headerName: "Cost/Unit", type: "number", flex: 1},
        {field: "price", headerName: "Price/Unit", type: "number", flex: 1},
       
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
            rows={recipes}
            columns={columns}
            getRowId={(row) => row._id}
            pageSize={pageSize}
            onPageSizeChange={(newSize) => setPageSize(newSize)}
            rowsPerPageOptions={[10, 50, 100, 150]}
            pagination
        />
    );
};

export default RecipeTable;
