import { ChangeEvent, useState, useRef, useEffect } from "react";
import { TextField, Box, Button, useMediaQuery } from "@mui/material";
import { primary } from "@/app/libs/color-config";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useCountries } from "@/app/contexts/countriesProvider";

import Flag from "@/app/component/common/nationFlag";
import { useMobileMedia } from "@/app/contexts/mobileResponsiveProvider";

interface MobileTextFieldProps {
  onChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    name: string,
    index?: number
  ) => void;
  value: string;
  name: string;
  disabled?: boolean;
}

interface Nation {
  iso2: string;
  engName: string;
  code: string;
}

const MobileTextField = ({
  onChange,
  value,
  name,
  disabled,
}: MobileTextFieldProps) => {
  const { matches } = useMobileMedia();
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
          sx={{
            backgroundColor: "white",
            mr: "auto",
            height: "100%",
            color: "black",
          }}
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
        pl: matches ? 0.5 : 2,
        position: "relative",
        fontSize: matches ? "0.8rem" : "1rem",
      }}
    >
      <Box sx={{ mb: 1, fontWeight: 900 }}>
        Contact No.
        <span style={{ fontWeight: 1000, color: "red", marginLeft: "2px" }}>
          *
        </span>
      </Box>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          height: matches ? "30px" : "40px",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              height: matches ? "30px" : "40px",
              width: matches ? "60px" : undefined,
              color: "black",
            }}
          >
            <Button
              variant="outlined"
              startIcon={<ArrowDropDownIcon />}
              onClick={() => setDropdown((prev) => !prev)}
              sx={{ height: "100%" }}
              disabled={disabled}
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
                  position: "absolute",
                  top: 80,
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
                  disabled={disabled}
                />
                <Box
                  sx={{
                    height: "40vh",
                    overflowY: "scroll",
                    overflowX: "hidden",
                    color: "black",
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
            ml: matches ? 1 : 0.2,
          }}
        >
          <TextField
            sx={{
              "& .MuiInput-underline:after": {
                borderBottomColor: "#B2BAC2",
              },
              "& .MuiOutlinedInput-root": {
                height: "40px",
                padding: 0,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 0,
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
              "& .MuiInputBase-input::placeholder": {
                opacity: 0.8,
                fontStyle: "italic",
                fontSize: matches ? "0.8rem" : "1rem",
              },
              "& .MuiInputBase-input": {
                height: "40px",
              },
            }}
            value={value}
            onChange={(e) => onChange(e, name)}
            fullWidth
            name={name}
            disabled={disabled}
            placeholder="Enter your phone"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default MobileTextField;
