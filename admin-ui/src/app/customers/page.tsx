"use client";

import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany, useList } from "@refinedev/core";
import { List, ShowButton, useDataGrid } from "@refinedev/mui";
import { useMemo } from "react";

export default function CustomersList() {
  const {
    result,
    query: { isFetching },
  } = useList();

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
        loading={isFetching}
        columns={columns}
        rows={result.data}
        sx={{
          border: "1px",
          borderColor: "primary.light",
          "& .MuiDataGrid-cell:hover": {
            color: "primary.main",
          },
          cursor: "pointer",
        }}
      />
    </List>
  );
}
