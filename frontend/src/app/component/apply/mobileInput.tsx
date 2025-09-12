import { ChangeEvent, useState, useRef, useEffect } from "react";
import { TextField, Box, Button, styled } from "@mui/material";
import { primary } from "@/app/libs/color-config";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useCountries } from "@/app/contexts/countriesContext";

import Flag from "@/app/component/common/nationFlag";

interface MobileTextFieldProps {
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
    index?: number
  ) => void;
  value: string;
  name: string;
}

interface Nation {
  iso2: string;
  engName: string;
  code: string;
}

const MobileTextField = ({ onChange, value, name }: MobileTextFieldProps) => {
  const { countries } = useCountries();
  const ref = useRef<HTMLDivElement | null>(null);
  const [selectNation, setSelectNation] = useState<Nation>({
    iso2: "US",
    engName: "United State",
    code: "+1",
  });
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [allCountry, setAllCountry] = useState<Nation[]>(countries);

  const handleSelectNation = (iso2: string) => {
    const [nation] = countries.filter((nation) => nation.iso2 == iso2);
    if (!nation.iso2) return;
    setSelectNation({
      iso2: nation?.iso2,
      engName: nation?.engName,
      code: nation?.code,
    });
    setDropdown(false);
    setAllCountry(countries);
  };
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    const filter = countries.filter((nation) =>
      nation.engName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setAllCountry(filter);
  };

  useEffect(() => {
    const handleCloseDropdownOutside = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleCloseDropdownOutside);
    return () =>
      document.removeEventListener("mousedown", handleCloseDropdownOutside);
  }, [dropdown]);

  const nationDropDown = allCountry.map((nation, i) => {
    return (
      <Box
        key={i}
        sx={{
          display: "flex",
          fontWeight: 600,
          alignItems: "center",
          width: "130%",
          backgroundColor: "white",
          overflowX: "hidden",
        }}
      >
        <Button
          sx={{ backgroundColor: "white", mr: "auto", height: "100%" }}
          onClick={() => handleSelectNation(nation.iso2)}
        >
          <p style={{ marginRight: "10px", width: "40px", textAlign: "end" }}>
            {nation.code}
          </p>
          <Flag code={nation.iso2} name={nation.engName} />
          <p
            style={{
              marginLeft: "10px",
              marginRight: "auto",
              whiteSpace: "nowrap",
            }}
          >
            {nation.engName}
          </p>
        </Button>
      </Box>
    );
  });

  return (
    <Box
      sx={{
        width: "100%",
        p: 1.5,
        pl: 2,
        position: "relative",
      }}
    >
      <Box sx={{ mb: 1, fontWeight: 900 }}>
        Contact No.
        <span style={{ fontWeight: 1000, color: "red", marginLeft: "2px" }}>
          *
        </span>
      </Box>
      <Box sx={{ display: "flex", width: "100%", height: "40px" }}>
        <Box>
          <Box sx={{ height: "100%", display: "flex" }}>
            <Button
              variant="outlined"
              startIcon={<ArrowDropDownIcon />}
              onClick={() => setDropdown((prev) => !prev)}
              sx={{ height: "100%" }}
            >
              <Flag code={selectNation.iso2} name={selectNation.engName} />
            </Button>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "100%",
            }}
            ref={ref}
          >
            {dropdown && (
              <Box
                sx={{
                  mt: 1,
                  position: "absolute",
                  top: 105,
                  left: 0,
                  right: 0,
                  backgroundColor: "white",
                  zIndex: 1000,
                }}
              >
                <TextField
                  placeholder="Search Country"
                  fullWidth
                  onChange={handleSearch}
                  // size="small"
                />
                <Box
                  sx={{
                    height: "40vh",
                    overflowY: "scroll",
                    overflowX: "hidden",
                  }}
                >
                  {nationDropDown}
                </Box>
              </Box>
            )}
          </Box>
        </Box>
        <Box
          sx={{
            height: "40px",
            border: "1px solid rgb(194, 194, 194)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            overflow: "hidden",
            borderRadius: "4px",
            "&:focus-within": { borderColor: "#6F7E8C" },
            "&:hover": { borderColor: primary },
            width: "100%",
          }}
        >
          <CssTextField
            value={value}
            onChange={(e) => onChange(e, name)}
            fullWidth
            // type="number"
            name={name}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MobileTextField;

const CssTextField = styled(TextField)({
  display: "flex",
  "& .MuiInput-underline:after": {
    borderBottomColor: "#B2BAC2",
  },
  "& .MuiOutlinedInput-root": {
    zIndex: 0,
    display: "flex",
    alignItems: "center",
    height: "100%",
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
});
