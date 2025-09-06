"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button, IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import MenuDashboard from "../component/menu/header-menu-dashboard";
import StateBar from "../component/apply/state-bar";
import Footer from "../component/footer/footer";
import AuthProvider from "../component/authProvider";
import { backend_url } from "../server-side/envLoader";
import { getUserInfo } from "../libs/getLocalStorage";
import { dateConvert } from "../libs/dateConvert";

const Dashboard = () => {
  const router = useRouter();
  const [applyInfo, setApplyInfo] = useState({
    incompleteApplied: 0,
    totalApplied: 0,
  });
  const [rows, setRows] = useState<Row[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    (async () => {
      const user = getUserInfo();
      setUserName(user.lastName);
      const endpoint = backend_url + "api" + `/visa-application/list-visa-application`;
      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${user.accessToken}` },
          params: { userId: user.id },
        });
        const data = response.data;
        if (data.success === "OK") {
          console.log(data.data);
          setApplyInfo((prev) => ({ ...prev, totalApplied: data.data.length }));
          setRows(data.data);
        }
      } catch (error: any) {
        console.log(error.response);
      }
    })();
  }, []);

  const handleRowClick: GridEventListener<"rowClick"> = (param) => {
    router.push(`/dashboard/apply?applicationId=${param.id}`);
  };

  return (
    <AuthProvider>
      <MenuDashboard userName={userName} />
      <StateBar
        incompleteApplied={applyInfo.incompleteApplied}
        totalApplied={applyInfo.totalApplied}
      />
      <Box sx={{ width: "80vw", m: "auto", mb: 3, mt: 4 }}>
        <DataGrid
          sx={{ cursor: "pointer" }}
          rows={rows}
          onRowClick={handleRowClick}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      <Footer />
    </AuthProvider>
  );
};

export default Dashboard;

interface Row {
  id: string;
  visaType: string;
  applyAt: string;
  fullName: string;
  birthDate: string;
}

const columns: GridColDef<Row[][number]>[] = [
  { field: "id", headerName: "id", width: 150 },
  { field: "visaType", headerName: "Visa Type", width: 90 },
  {
    field: "fullName",
    headerName: "Full name",
    sortable: false,
    width: 150,
  },
  {
    field: "birthDate",
    headerName: "Date of birth",
    width: 150,
    valueGetter: (value) => {
      if (!value) return null;
      return dateConvert(value);
    },
  },
  {
    field: "nationality",
    headerName: "Nationality",
    width: 150,
  },
  {
    field: "documentNo",
    headerName: "Travel Doc.",
    sortable: false,
    width: 150,
  },
  {
    field: "createAt",
    headerName: "Createted Date",
    width: 150,
    valueGetter: (value) => {
      return dateConvert(value);
    },
  },
];
