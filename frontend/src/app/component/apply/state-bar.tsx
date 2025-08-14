import { Box, Button, IconButton, Stack, Divider } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import PublicIcon from "@mui/icons-material/Public";

interface StateBarProps {
  totalApplied: string;
  incompleteApplied: string;
}

const StateBar = ({ totalApplied, incompleteApplied }: StateBarProps) => {
  return (
    <Box sx={{ p: 2, mt: 4 }}>
      <h2>My Dashboard</h2>
      <Stack direction="row" spacing={2} marginTop={3} marginLeft={5} alignItems={"center"}>
        <Button variant="contained" startIcon={<AddRoundedIcon />} href="/dashboard/apply">
          Apply for new Visa
        </Button>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PublicIcon />
            <p style={{ marginLeft: "10px", fontWeight: 700 }}>
              Total Application: <span style={{ color: "red" }}>{totalApplied}</span>
            </p>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box sx={{ fontWeight: 700 }}>
          Incomplete Visa Application: <span style={{ color: "red" }}>{incompleteApplied}</span>
        </Box>
      </Stack>
    </Box>
  );
};
export default StateBar;
