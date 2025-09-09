import { useState, useMemo } from "react";
import {
  FormControl,
  IconButton,
  Box,
  OutlinedInput,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import { useFormControl } from "@mui/material/FormControl";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./form.module.css";
import { white } from "@/app/libs/color-config";

interface FormRow {
  label: string;
  placeholder: string;
  [key: string]: any;
  checkEmpty: boolean;
}

export default function PasswordFormRow({
  label,
  placeholder,
  checkEmpty,
  ...props
}: FormRow) {
  const [hiddenPassword, setHiddenpassword] = useState<boolean>(false);

  const handleRevealPassword = () => {
    setHiddenpassword(!hiddenPassword);
  };

  function ErroMessage() {
    const { filled } = useFormControl() || {};
    const helperText = useMemo(() => {
      if (checkEmpty === true) {
        if (filled === false) {
          return `Please fill your ${label}`;
        }
        return "";
      }
    }, [checkEmpty]);

    return <FormHelperText error>{helperText}</FormHelperText>;
  }

  return (
    <Box
      sx={{ display: "flex", width: "80%", m: "auto", mt: 2, flexDirection: "column" }}
    >
      <div className={styles.labelPasswordRow}>
        {label} <span className={styles.star}>&nbsp;*</span>
      </div>
      <FormControl sx={{ width: "100%" }} variant="outlined" size="small">
        <OutlinedInput
          {...props}
          sx={{ backgroundColor: white }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton size="small" edge="end" onClick={handleRevealPassword}>
                {hiddenPassword ? (
                  <VisibilityIcon fontSize="small" />
                ) : (
                  <VisibilityOffIcon fontSize="small" />
                )}
              </IconButton>
            </InputAdornment>
          }
          type={`${!hiddenPassword ? "password" : "text"}`}
          required
          fullWidth
          placeholder={`${placeholder}`}
        />
        <ErroMessage />
      </FormControl>
    </Box>
  );
}
