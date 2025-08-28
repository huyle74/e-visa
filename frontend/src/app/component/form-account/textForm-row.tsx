import { FormControl, TextField, TextFieldProps } from "@mui/material";
import styles from "./form.module.css";
import { success, white } from "@/app/libs/color-config";

interface FormRow {
  label: string;
  placeholder: string;
  [key: string]: any;
}

export default function TextFormRow({ label, placeholder, ...props }: FormRow) {
  return (
    <FormControl sx={{ width: "80%", m: "auto", mt: 3 }}>
      <div className={styles.labelPasswordRow}>
        {label} <span className={styles.star}>&nbsp;*</span>
      </div>
      <TextField
        // required
        fullWidth
        placeholder={placeholder}
        {...props}
        variant="outlined"
        size="small"
        sx={{ backgroundColor: white, fontWeight: 900 }}
      />
    </FormControl>
  );
}
