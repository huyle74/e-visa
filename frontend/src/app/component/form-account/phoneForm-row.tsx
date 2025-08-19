import React, { forwardRef } from "react";
import { Box, TextField, Button, Input } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import styles from "./form.module.css";

interface Nation {
  code: string;
  countryCode: string;
  iso2: string;
  engName: string;
}

interface PhoneFormRowType {
  countries: Nation[];
  nationData: Nation;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  dropdown: boolean;
  onClickDropdown: () => void;
  onChangeSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  phoneNumb: string;
}

const PhoneFormRow = forwardRef<HTMLDivElement, PhoneFormRowType>((props, ref) => {
  const {
    countries,
    nationData,
    onChange,
    onClick,
    dropdown,
    onClickDropdown,
    onChangeSearch,
    phoneNumb,
  } = props;

  const FlageNation = ({ iso2 = "US" }: any) => {
    return (
      <img
        loading="lazy"
        width="23"
        height="18"
        srcSet={`https://flagcdn.com/w40/${iso2.toLowerCase()}.png 2x`}
        src={`https://flagcdn.com/w20/${iso2.toLowerCase()}.png`}
        alt=""
      />
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ].includes(e.key);

    const isLetter = e.key.length === 1 && /[a-zA-Z]/.test(e.key);
    if (isLetter || (phoneNumb.length >= 11 && !allowedKeys)) {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.phoneCodeNation}>
      <Box sx={{ display: "flex", height: "2.6rem" }}>
        <Button
          endIcon={<ArrowDropDownIcon />}
          variant="contained"
          sx={{ mr: 1 }}
          color="secondary"
          onClick={onClickDropdown}
        >
          <FlageNation iso2={nationData?.iso2} />
        </Button>
        <Box
          sx={{
            display: "flex",
            color: "black",
            alignItems: "center",
            width: "100%",
            backgroundColor: "#fffadc",
          }}
        >
          <Box sx={{ ml: 1.5, mr: 1 }}>{nationData.code}</Box>
          <Input
            name="phone"
            onKeyDown={handleKeyDown}
            sx={{ height: "100%" }}
            value={phoneNumb}
            fullWidth={true}
            onChange={onChange}
            color="secondary"
            // required
            disableUnderline={true}
          />
        </Box>
      </Box>
      {dropdown && (
        <Box
          ref={ref}
          sx={{
            position: "absolute",
            zIndex: 1000,
            backgroundColor: "white",
            width: "100%",
            mt: 1,
          }}
        >
          <TextField
            label="Search"
            onChange={onChangeSearch}
            size="small"
            color="primary"
            variant="filled"
            fullWidth={true}
            type="search"
            itemType="number"
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              overflowY: "scroll",
              overflowX: "hidden",
              height: "40vh",
              width: "100%",
              pb: 2,
            }}
          >
            {countries.map((nation, key) => {
              return (
                <div key={key} className={styles.listContainer}>
                  <li onClick={onClick}>
                    <FlageNation iso2={nation.iso2} />
                    <p>{nation.engName}</p>
                    <p>{nation.code}</p>
                  </li>
                </div>
              );
            })}
          </Box>
        </Box>
      )}
    </div>
  );
});

export default PhoneFormRow;
