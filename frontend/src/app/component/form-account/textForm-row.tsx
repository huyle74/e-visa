import { useMemo } from "react";
import { OutlinedInput, FormHelperText } from "@mui/material";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import styles from "./form.module.css";
import { white } from "@/app/libs/color-config";

interface FormRow {
  label: string;
  placeholder: string;
  [key: string]: any;
  value: string;
  checkEmpty: boolean;
}

export default function TextFormRow({
  label,
  placeholder,
  value,
  checkEmpty,
  ...props
}: FormRow) {
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
    <FormControl sx={{ width: "80%", m: "auto", mt: 3 }}>
      <div className={styles.labelPasswordRow}>
        {label} <span className={styles.star}>&nbsp;*</span>
      </div>
      <OutlinedInput
        fullWidth
        placeholder={placeholder}
        value={value}
        {...props}
        size="small"
        sx={{ backgroundColor: white, fontWeight: 900 }}
      />
      <ErroMessage />
    </FormControl>
  );
}
