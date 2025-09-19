import { Box, CircularProgress } from "@mui/material";

const Loading = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "98vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        m: "auto",
        backgroundColor: "black",
      }}
    >
      <Box display={"flex"} alignItems={"center"} sx={{ height: "100%" }}>
        <CircularProgress />
        Wait a second...
      </Box>
    </Box>
  );
};

export default Loading;
