import { ChangeEvent } from "react";
import { Switch, Box } from "@mui/material";

interface SwitchYesNoProps {
  content: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SwithYesNo = ({ content, checked, onChange }: SwitchYesNoProps) => {
  return (
    <Box
      sx={{
        pr: 2,
        pl: 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Box>
        {content}
        <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}> *</span>
      </Box>
      <span style={{ marginLeft: "10px" }}>
        No
        <Switch
          slotProps={{ input: { "aria-label": "controlled" } }}
          checked={checked}
          onChange={onChange}
        />
        Yes
      </span>
    </Box>
  );
};

export default SwithYesNo;
