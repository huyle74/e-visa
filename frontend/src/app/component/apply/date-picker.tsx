import * as React from "react";
import useForkRef from "@mui/utils/useForkRef";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { CalendarIcon, ClearIcon } from "@mui/x-date-pickers/icons";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DatePickerFieldProps,
  DatePickerProps,
} from "@mui/x-date-pickers/DatePicker";
import { unstable_useDateField as useDateField } from "@mui/x-date-pickers/DateField";
import { Unstable_PickersSectionList as PickersSectionList } from "@mui/x-date-pickers/PickersSectionList";
import { usePickerContext } from "@mui/x-date-pickers/hooks";
import { Dayjs } from "dayjs";
import { teal } from "@mui/material/colors";

const primary = teal[800];

const BrowserFieldRoot = styled("div", { name: "BrowserField", slot: "Root" })({
  display: "flex",
  alignItems: "center",
  border: "1px solid  rgb(190, 190, 190)",
  "& .MuiInputAdornment-root": {
    height: "auto",
  },
  height: "40px",
  "&:focus-within": { borderColor: "#6F7E8C" },
  "&:hover": { borderColor: primary },
  justifyContent: "space-between",
  borderRadius: "4px",
});

const BrowserFieldContent = styled("div", { name: "BrowserField", slot: "Content" })({
  fontSize: "1.1rem",
  lineHeight: "normal",
  whiteSpace: "nowrap",
  paddingLeft: "10px",
  color: "GrayText",
});

const BrowserIconButton = styled("button", {
  name: "BrowserField",
  slot: "IconButton",
})({
  backgroundColor: "transparent",
  border: 0,
  cursor: "pointer",
  "&:hover, &:focus": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  color: primary,
  display: "flex",
  alignItems: "center",
  marginRight: "10px",
});

function BrowserDateField(props: DatePickerFieldProps) {
  const fieldResponse = useDateField<true, typeof props>(props);

  const {
    // Should be ignored
    enableAccessibleFieldDOMStructure,

    // Should be passed to the PickersSectionList component
    elements,
    sectionListRef,
    contentEditable,
    onFocus,
    onBlur,
    tabIndex,
    onInput,
    onPaste,
    onKeyDown,

    // Should be passed to the button that opens the picker
    openPickerAriaLabel,

    // Can be passed to a hidden <input /> element
    onChange,
    value,

    // Can be passed to the button that clears the value
    onClear,
    clearable,

    // Can be used to style the component
    areAllSectionsEmpty,
    disabled,
    readOnly,
    focused,
    error,

    // The rest can be passed to the root element
    ...other
  } = fieldResponse;

  const pickerContext = usePickerContext();
  const handleRef = useForkRef(pickerContext.triggerRef, pickerContext.rootRef);

  return (
    <BrowserFieldRoot {...other} ref={handleRef}>
      <BrowserFieldContent>
        <PickersSectionList
          elements={elements}
          sectionListRef={sectionListRef}
          contentEditable={contentEditable}
          onFocus={onFocus}
          onBlur={onBlur}
          tabIndex={tabIndex}
          onInput={onInput}
          onPaste={onPaste}
          onKeyDown={onKeyDown}
        />
      </BrowserFieldContent>
      {clearable && value && (
        <BrowserIconButton
          type="button"
          title="Clear"
          tabIndex={-1}
          onClick={onClear}
          sx={{ marginLeft: 1 }}
        >
          <ClearIcon fontSize="small" />
        </BrowserIconButton>
      )}
      <BrowserIconButton
        onClick={() => pickerContext.setOpen((prev) => !prev)}
        sx={{ marginLeft: 1 }}
        aria-label={openPickerAriaLabel}
      >
        <CalendarIcon />
      </BrowserIconButton>
    </BrowserFieldRoot>
  );
}

function BrowserDatePicker(props: DatePickerProps) {
  return <DatePicker {...props} slots={{ field: BrowserDateField, ...props.slots }} />;
}

interface DatePickerComponentProps {
  title: string;
  onChange: NonNullable<DatePickerProps["onChange"]>;
  value: Dayjs | null;
}

export default function DatePickerComponent({
  title,
  onChange,
  value,
}: DatePickerComponentProps) {
  return (
    <Box sx={{ width: "100%", p: 1.5 }}>
      <Box sx={{ mb: 1, fontWeight: 900 }}>
        {title}
        <span style={{ color: "red", fontWeight: 900, marginLeft: "2px" }}>*</span>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <BrowserDatePicker
          slotProps={{
            field: { clearable: true },
          }}
          onChange={onChange}
          value={value}
        />
      </LocalizationProvider>
    </Box>
  );
}
