import { Skeleton, Box } from "@mui/material";

export default function Loading() {
  return (
    <Box>
      <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
    </Box>
  );
}
