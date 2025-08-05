import { FormControl, TextField } from "@mui/material";
import styles from "./form.module.css";

interface FormRow {
  label: String;
  placeholder: String;
  [key: string]: any;
}

export default function TextFormRow({ label, placeholder, ...props }: FormRow) {
  return (
    <FormControl sx={{ width: "80%", m: "auto", mt: 3 }}>
      <div className={styles.labelPasswordRow}>
        {label} <span className={styles.star}>&nbsp;*</span>
      </div>
      <TextField
        required
        fullWidth
        placeholder={`${placeholder}`}
        {...props}
        variant="outlined"
        size="small"
        sx={{ backgroundColor: "#fffadc", fontWeight: 900 }}
      />
    </FormControl>
  );
}
