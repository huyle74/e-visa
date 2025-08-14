import { useState } from "react";
import { FormControl, IconButton, Box, OutlinedInput, InputAdornment } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./form.module.css";

interface FormRow {
  label: string;
  placeholder: string;
  [key: string]: any;
}

export default function PasswordFormRow({ label, placeholder, ...props }: FormRow) {
  const [hiddenPassword, setHiddenpassword] = useState<boolean>(false);

  const handleRevealPassword = (e: any) => {
    setHiddenpassword(!hiddenPassword);
  };

  return (
    <Box sx={{ display: "flex", width: "80%", m: "auto", mt: 2, flexDirection: "column" }}>
      <div className={styles.labelPasswordRow}>
        {label} <span className={styles.star}>&nbsp;*</span>
      </div>
      <FormControl sx={{ width: "100%" }} variant="outlined" size="small">
        <OutlinedInput
          {...props}
          sx={{ backgroundColor: "#fffadc" }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" edge="end" onClick={(e) => handleRevealPassword(e)}>
                {hiddenPassword ? <VisibilityIcon fontSize="small" /> : <VisibilityOffIcon fontSize="small" />}
              </IconButton>
            </InputAdornment>
          }
          type={`${!hiddenPassword ? "password" : "text"}`}
          // required
          fullWidth
          placeholder={`${placeholder}`}
        />
      </FormControl>
    </Box>
  );
}
