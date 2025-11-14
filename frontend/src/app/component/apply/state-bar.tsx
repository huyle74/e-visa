import { Box, Button, Stack, Divider, useMediaQuery } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ArticleIcon from "@mui/icons-material/Article";
import PublicIcon from "@mui/icons-material/Public";

interface StateBarProps {
  totalApplied: string | null | number;
  incompleteApplied: string | null | number;
}

const StateBar = ({ totalApplied, incompleteApplied }: StateBarProps) => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Box sx={{ p: matches ? 1 : 2, mt: matches ? 0 : 4 }}>
      <h2 style={{ fontSize: matches ? "1rem" : "2rem" }}>My Dashboard</h2>
      <Stack
        direction={matches ? "column" : "row"}
        spacing={matches ? 1 : 2}
        marginTop={3}
        marginLeft={matches ? 0 : 5}
        alignItems={matches ? "flex-start" : "center"}
      >
        <Button
          variant="contained"
          startIcon={<AddRoundedIcon />}
          href="/dashboard/apply"
        >
          <Box sx={{ fontSize: matches ? "0.7rem" : "1rem" }}>
            Apply new Visa
          </Box>
        </Button>
        <Box>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <PublicIcon color="primary" />
            <p
              style={{
                marginLeft: "10px",
                fontWeight: 700,
              }}
            >
              Total Application:
              <span style={{ marginLeft: "10px", color: "red" }}>
                {totalApplied}
              </span>
            </p>
          </Box>
        </Box>
        <Divider orientation="vertical" flexItem variant="middle" />
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <ArticleIcon color="secondary" />
          <p style={{ marginLeft: "10px", fontWeight: 700 }}>
            Incomplete Visa Application:
            <span style={{ marginLeft: "10px", color: "red" }}>
              {incompleteApplied}
            </span>
          </p>
        </Box>
      </Stack>
    </Box>
  );
};
export default StateBar;
