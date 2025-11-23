"use client";

import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Box, Button, Chip } from "@mui/material";
import { useRouter } from "next/navigation";
import {
  DataGrid,
  GridColDef,
  GridEventListener,
  GridRowSelectionModel,
} from "@mui/x-data-grid";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import MenuDashboard from "../component/menu/header-menu-dashboard";
import StateBar from "../component/apply/state-bar";
import Footer from "../component/footer/footer";
import { AuthProvider } from "../contexts/authProvider";
import { backend_url } from "../server-side/envLoader";
import { dateConvert } from "../libs/dateConvert";
import ModalWithButton from "../component/common/modalWithButton";
import { getUserInfo } from "../libs/getLocalStorage";
import { ApplicationStatus } from "../libs/types";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useMobileMedia } from "../contexts/mobileResponsiveProvider";

interface Row {
  id: string;
  visaType: string;
  applyAt: string;
  fullName: string;
  birthDate: string;
}

const Dashboard = () => {
  const { matches } = useMobileMedia();
  const router = useRouter();
  const [user, setUser] = useState<any>();
  const [applyInfo, setApplyInfo] = useState({
    incompleteApplied: 0,
    totalApplied: 0,
  });
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selected, setSelected] = useState<GridRowSelectionModel>({
    type: "include",
    ids: new Set(),
  });
  const [openModal, setOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const userInfo = getUserInfo();
    setUser(userInfo);
    (async () => {
      const endpoint =
        backend_url + "api" + `/visa-application/list-visa-application`;
      try {
        const response = await axios.get(endpoint, {
          headers: { Authorization: `Bearer ${userInfo.accessToken}` },
          params: { userId: userInfo.id },
        });
        const data = response.data;
        if (data.success === "OK") {
          const uncompletedApplication = data.data.filter(
            (application: any) => {
              return application.status === ApplicationStatus.COMPLETED;
            }
          );
          const totalApplied = data.data.length;
          const incompleteApplied =
            totalApplied - uncompletedApplication.length;
          setApplyInfo({
            totalApplied,
            incompleteApplied,
          });

          setRows(data.data);
        }
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
      }
    })();
  }, [loading]);

  const handleRowClick: GridEventListener<"rowClick"> = (param) => {
    router.push(
      `/dashboard/apply?applicationId=${param.id}&status=${param.row.status}`
    );
  };

  const handleOpen = useCallback(() => setOpenModal(true), []);
  const handleClose = useCallback(() => setOpenModal(false), []);

  const handleDeleteForm = async () => {
    setLoading(true);
    const applicationIds = Array.from(selected.ids);
    const endpoint =
      backend_url + "api" + `/visa-application/delete-application-by-ids`;
    try {
      const response = await axios.post(
        endpoint,
        { applicationIds },
        {
          headers: { Authorization: `Bearer ${user.accessToken}` },
          params: { userId: user.id },
        }
      );
      if (response.data.success === "OK") {
        handleClose();
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error.response.data);
      handleClose();
    }
  };

  const columns: GridColDef<Row[][number]>[] = [
    { field: "id", headerName: "id", width: matches ? 15 : 150 },
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
      headerName: "Created Date",
      width: 150,
      valueGetter: (value) => {
        return dateConvert(value);
      },
    },
    {
      field: "status",
      headerName: "Status",
      sortable: true,
      width: 150,
      renderCell: (value: any) => {
        const render =
          value.row.status === ApplicationStatus.COMPLETED ? (
            <Chip
              label="Completed"
              icon={<CheckCircleOutlineIcon />}
              color="success"
            />
          ) : (
            <Chip
              label="Uncompleted"
              icon={<ErrorOutlineIcon />}
              color="secondary"
            />
          );

        return render;
      },
    },
  ];

  return (
    <AuthProvider>
      <Box
        sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <MenuDashboard />
        <StateBar
          incompleteApplied={applyInfo.incompleteApplied}
          totalApplied={applyInfo.totalApplied}
        />
        <Box
          sx={{
            width: matches ? "99vw" : "90vw",
            m: "auto",
            mb: 3,
            mt: 4,
            display: "flex",
            flexDirection: "column",
          }}
        >
          {Array.from(selected.ids).length !== 0 && (
            <Box sx={{ ml: "auto", mb: 1 }}>
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={handleOpen}
              >
                Delete
              </Button>
            </Box>
          )}
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
            onRowSelectionModelChange={setSelected}
            checkboxSelection
            rowSelection
            disableRowSelectionOnClick
            loading={loading}
            slotProps={{
              loadingOverlay: {
                variant: "linear-progress",
                noRowsVariant: "skeleton",
              },
            }}
          />
        </Box>
        <Footer />
        <ModalWithButton
          loading={loading}
          onClose={handleClose}
          open={openModal}
          title={"Are you sure to delete these applications?"}
          onClick={handleDeleteForm}
        />
      </Box>
    </AuthProvider>
  );
};

export default Dashboard;
