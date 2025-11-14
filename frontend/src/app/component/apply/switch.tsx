import { ChangeEvent } from "react";
import { Switch, Box, useMediaQuery } from "@mui/material";

interface SwitchYesNoProps {
  content: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const SwitchYesNo = ({
  content,
  checked,
  onChange,
  disabled,
}: SwitchYesNoProps) => {
  const matches = useMediaQuery("(max-width:600px)");

  return (
    <Box
      sx={{
        pr: matches ? 0.5 : 2,
        pl: matches ? 0.5 : 2,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        fontSize: matches ? "0.8rem" : "1rem",
      }}
    >
      <Box>
        {content}
        <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}>
          *
        </span>
      </Box>
      <span style={{ marginLeft: matches ? 0 : "10px" }}>
        No
        <Switch
          slotProps={{ input: { "aria-label": "controlled" } }}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          size={matches ? "small" : "medium"}
        />
        Yes
      </span>
    </Box>
  );
};

export default SwitchYesNo;
