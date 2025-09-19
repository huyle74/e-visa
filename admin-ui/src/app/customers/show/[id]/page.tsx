"use client";

import { useMemo } from "react";
import { Typography, Box, Button } from "@mui/material";
import { useShow, useGo } from "@refinedev/core";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Show, Breadcrumb } from "@refinedev/mui";
import { dateFormat } from "@app/libs/date";

export default function CustomerShow() {
  const { query, result: data } = useShow();
  const go = useGo();

  const rows = data?.application.map((row: any, i: number) => {
    return { ...row, id: i + 1 };
  });

  const columns = useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "No.",
        type: "number",
        minWidth: 5,
        display: "flex",
        align: "left",
        headerAlign: "left",
        sortable: false,
      },
      {
        field: "fromCountry",
        headerName: "From",
        type: "string",
        minWidth: 100,
        display: "flex",
        align: "left",
        headerAlign: "center",
        sortable: false,
      },
      {
        field: "toCountry",
        headerName: "To",
        type: "string",
        minWidth: 100,
        display: "flex",
        align: "left",
        headerAlign: "center",
        sortable: false,
      },
      {
        field: "price",
        headerName: "Price",
        type: "string",
        minWidth: 100,
        display: "flex",
        align: "right",
        headerAlign: "center",
        sortable: false,
        renderCell: ({ value }) => {
          return <>{value + "  $"}</>;
        },
      },
      {
        field: "payment",
        headerName: "Payment",
        type: "string",
        minWidth: 100,
        display: "flex",
        align: "center",
        headerAlign: "center",
        sortable: false,
        renderCell: ({ value }) => {
          return <>{value ? "Yes" : "No"}</>;
        },
      },
      {
        field: "createdAt",
        headerName: "Create At",
        type: "string",
        minWidth: 150,
        display: "flex",
        align: "left",
        headerAlign: "center",
        sortable: true,
        renderCell: ({ value }) => {
          return <>{dateFormat(value)}</>;
        },
      },
      {
        field: "updatedAt",
        headerName: "Last update At",
        type: "string",
        minWidth: 150,
        display: "flex",
        align: "left",
        headerAlign: "center",
        sortable: true,
        renderCell: ({ value }) => {
          return <>{dateFormat(value)}</>;
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
        renderCell: ({ row }) => {
          return (
            <Button
              onClick={() => {
                console.log(row);
                go({
                  to: {
                    resource: "application",
                    action: "show",
                    id: row.correlationId,
                    meta: { query: row.userId },
                  },
                });
              }}
            >
              <VisibilityOutlinedIcon />
            </Button>
          );
        },
      },
    ],
    []
  );
  return (
    <Show
      isLoading={query.isLoading}
      canDelete={false}
      breadcrumb={<Breadcrumb breadcrumbProps={{ separator: "/" }} />}
    >
      <div>
        <Typography variant="h5" fontWeight="bold" color="secondary">
          Information
        </Typography>
        <Box
          sx={{
            display: "flex",
            width: "60%",
            justifyContent: "space-between",
          }}
        >
          <Box sx={styleInformation}>
            <p>First Name:</p>
            <p style={styleTextField}>{data?.firstName}</p>
          </Box>
          <p>|</p>
          <Box sx={styleInformation}>
            <p>Last Name:</p>
            <p style={styleTextField}>{data?.lastName}</p>
          </Box>
        </Box>
        <Box sx={styleInformation}>
          <p>Email:</p>
          <p style={styleTextField}>{data?.email}</p>
        </Box>
        <Box sx={styleInformation}>
          <p>Phone:</p>
          <p style={styleTextField}>{data?.phoneNumber || "not found"}</p>
        </Box>
      </div>

      <DataGrid columns={columns} rows={rows} />
    </Show>
  );
}

const styleInformation = {
  display: "flex",
  alignItems: "center",
};
const styleTextField = {
  fontSize: "1rem",
  fontWeight: 400,
  marginLeft: "10px",
};
