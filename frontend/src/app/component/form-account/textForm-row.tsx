import { useMemo } from "react";
import { OutlinedInput, FormHelperText, useMediaQuery } from "@mui/material";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import styles from "./form.module.css";
import { white } from "@/app/libs/color-config";
import { useMobileMedia } from "@/app/contexts/mobileResponsiveProvider";

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
  const { matches } = useMobileMedia();
  function ErrorMessage() {
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
    <FormControl sx={{ width: matches ? "95%" : "80%", m: "auto", mt: 3 }}>
      <div className={styles.labelPasswordRow}>
        {label} <span className={styles.star}>&nbsp;*</span>
      </div>
      <OutlinedInput
        fullWidth
        placeholder={placeholder}
        value={value}
        {...props}
        size="small"
        sx={{
          backgroundColor: white,
          fontWeight: 900,
        }}
      />
      <ErrorMessage />
    </FormControl>
  );
}
