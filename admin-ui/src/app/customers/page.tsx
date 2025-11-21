"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { List, ShowButton, useDataGrid } from "@refinedev/mui";
import { useMemo } from "react";

export default function CustomersList() {
  const { dataGridProps } = useDataGrid({
    pagination: {
      mode: "server",
      pageSize: 10,
    },
    resource: "customer",
    syncWithLocation: true,
  });

  const {
    paginationMode,
    paginationModel,
    onPaginationModelChange,
    ...restDataGridProps
  } = dataGridProps;

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "string",
        minWidth: 100,
        display: "flex",
        align: "left",
        headerAlign: "left",
        sortable: false,
      },
      {
        field: "firstName",
        headerName: "First Name",
        type: "string",
        minWidth: 150,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "lastName",
        headerName: "Last Name",
        type: "string",
        minWidth: 150,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "email",
        headerName: "Email",
        type: "string",
        minWidth: 250,
        display: "flex",
        align: "right",
        sortable: false,
        headerAlign: "center",
      },
      {
        field: "phoneNumber",
        headerName: "Phone",
        type: "string",
        minWidth: 150,
        display: "flex",
        align: "right",
        headerAlign: "right",
        sortable: false,
      },
      {
        field: "totalApplications",
        headerName: "Total Applications",
        type: "string",
        minWidth: 150,
        display: "flex",
        align: "right",
        headerAlign: "right",
        sortable: false,
      },
      {
        field: "createAt",
        headerName: "Created At",
        type: "string",
        minWidth: 150,
        display: "flex",
        align: "right",
        headerAlign: "right",
        sortable: true,
        valueFormatter: (date) => {
          const newDate = new Date(date);
          const hour = String(newDate.getHours()).padStart(2, "0");
          const minute = String(newDate.getMinutes()).padStart(2, "0");
          const day = String(newDate.getDate()).padStart(2, "0");
          const month = String(newDate.getMonth() + 1).padStart(2, "0"); // FIX: +1
          const year = newDate.getFullYear();

          return hour + ":" + minute + " " + day + "-" + month + "-" + year;
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "center",
        headerAlign: "center",
        minWidth: 80,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <ShowButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid
        sx={{
          border: "1px",
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          cursor: "pointer",
        }}
        paginationMode={paginationMode}
        paginationModel={paginationModel}
        onPaginationModelChange={onPaginationModelChange}
        {...restDataGridProps}
        columns={columns}
      />
    </List>
  );
}
