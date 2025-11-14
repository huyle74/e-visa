import React, {
  useState,
  useRef,
  useEffect,
  ChangeEvent,
  MouseEventHandler,
} from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  InputLabel,
  MenuItem,
  styled,
  FormControl,
  InputBase,
  Divider,
  Typography,
  Modal,
  useMediaQuery,
} from "@mui/material";
import axios from "axios";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextFormRow from "./textForm-row";
import PhoneFormRow from "./phoneForm-row";
import PasswordFormRow from "./textPassword-row";
import styles from "./form.module.css";
import { primary, secondary, white } from "@/app/libs/color-config";
import { backend_url } from "@/app/server-side/envLoader";
import { useCountries } from "@/app/contexts/countriesContext";

interface Country {
  code: string;
  countryCode: string;
  iso2: string;
  engName: string;
}

interface Account {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  nation: string;
  confirmPassword: string;
}

export default function CreateAccoutForm() {
  const matches = useMediaQuery("(max-width:600px)");
  const { countries } = useCountries();
  const [nation, setNation] = useState("");
  const [nationData, setNationData] = useState<Country>({
    code: "+1",
    iso2: "US",
    countryCode: "",
    engName: "",
  });
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [countriesList, setCountriesList] = useState<Country[]>(countries);
  const [formatPhoneNumb, setFormatPhoneNumb] = useState<string>("");
  const [account, setAccount] = useState<Account>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    nation: "",
    confirmPassword: "",
  });
  const [errorMessage, setErrorMessage] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [checkEmpty, setCheckEmpty] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");

  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: SelectChangeEvent) => {
    setNation(e.target.value);
    const nationData =
      countries.find((nation) => nation.engName == e.target.value) ||
      countries[2];
    setNationData(nationData);
    setAccount((prev) => ({ ...prev, nation: nationData.iso2 }));
  };

  const handleSelectNationNumb = (e: React.MouseEvent<HTMLElement>) => {
    const child = e.currentTarget.childNodes[1];
    if (child instanceof Element) {
      const nationName = child.innerHTML;
      const selectNation =
        countries.find((nation) => nation.engName == nationName) ||
        countries[2];
      setNationData(selectNation);
      setDropdown(false);
      setCountriesList(countries);
    }
  };

  const handleSearchNation = (e: ChangeEvent<HTMLInputElement>) => {
    const searchTerm = e.target.value;
    if (searchTerm.length !== 0) {
      const finalTerm = searchTerm[0].toUpperCase() + searchTerm.slice(1);
      const nationSearch = countries.filter((nation) =>
        nation.engName.includes(finalTerm)
      );
      setCountriesList(nationSearch);
    } else {
      setCountriesList(countries);
    }
  };

  useEffect(() => {
    const handleDropdown = (e: MouseEvent) => {
      if (ref.current !== null && !ref.current?.contains(e.target as Node)) {
        setDropdown(!dropdown);
        setCountriesList(countries);
      }
    };
    document.addEventListener("mousedown", handleDropdown);

    return () => {
      document.removeEventListener("mousedown", handleDropdown);
    };
  }, [dropdown]);

  const handleClickDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleOnChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    const format = e.target.value
      .replace(/(\d{3})(\d{3})(\d{0,4})/, "$1-$2-$3")
      .replace(/-$/, "");
    setAccount((prev) => ({ ...prev, phoneNumber: format }));
    setFormatPhoneNumb(format);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prev) => ({ ...prev, [name]: value }));
  };

  const checkConfirmPassword = () => {
    const { confirmPassword, password } = account;
    if (confirmPassword === password) {
      return true;
    } else {
      setModalMessage("2 Passwords do not match");
      handleOpen();
      return false;
    }
  };

  const checkValidPassword = () => {
    const check = /^(?=.*[0-9]).{8,}$/.test(account.password);
    if (!check) {
      setModalMessage(
        "Your password need minimum of 8 characters \nand Include at least one number (0-9)"
      );
      handleOpen();
    }
    return check;
  };

  const handleSubmit: MouseEventHandler<HTMLButtonElement> = async (e) => {
    setCheckEmpty(true);
    e.preventDefault();
    try {
      const checkPassword = checkConfirmPassword();
      if (!checkPassword) return;

      const validPassword = checkValidPassword();
      if (!validPassword) return;

      setLoading(true);
      const endpoint = backend_url + "api" + "/create-account";
      const { phoneNumber, ...rest } = account;
      const finalAccount = {
        ...rest,
        phoneNumber:
          phoneNumber.length !== 0
            ? nationData.code + " " + phoneNumber.replace("-", "")
            : "",
      };
      const response = await axios.post(endpoint, finalAccount, {
        headers: { "Content-Type": "application/json" },
      });
      const { success } = response.data;
      if (success == "OK") {
        router.push("/login");
      }
    } catch (err: any) {
      setLoading(false);
      const errorMessage = err.response.data.message;
      if (Array.isArray(errorMessage)) {
        setErrorMessage(errorMessage);
      } else {
        setErrorMessage(Array(errorMessage));
      }
    }
  };
  const formControlStyle = { width: matches ? "95%" : "80%", m: "auto", mt: 3 };

  return (
    <Box sx={{ padding: "3rem 0 3rem 0", backgroundColor: secondary }}>
      <div
        className={styles.form}
        style={{
          color: white,
          border: `1px solid ${primary}`,
          backgroundColor: white,
        }}
      >
        <div className={styles.formHeader} style={{ backgroundColor: primary }}>
          My E-Visa Account
        </div>
        <div
          style={{
            color: "black",
            width: "80%",
            margin: "auto",
            fontSize: "1rem",
            fontWeight: 700,
            marginTop: "1rem",
          }}
        >
          Create an Account
        </div>
        <Box
          sx={{
            ...formControlStyle,
            fontWeight: 900,
            color: "black",
            fontSize: "0.9rem",
          }}
        >
          <Box sx={{ textAlign: "center" }}>Individual</Box>
          <Divider sx={{ mt: 1 }}>
            <Box
              sx={{
                height: "3px",
                backgroundColor: "yellow",
                width: "100px",
                m: 0,
                p: 0,
              }}
            ></Box>
          </Divider>
        </Box>
        <form>
          <TextFormRow
            label={"First name"}
            placeholder={"Enter Your first name"}
            name="firstName"
            onChange={handleInputChange}
            value={account.firstName}
            checkEmpty={checkEmpty}
          />
          <TextFormRow
            label={"Family Name"}
            placeholder={"Enter Your Family Name"}
            name="lastName"
            onChange={handleInputChange}
            value={account.lastName}
            checkEmpty={checkEmpty}
          />

          <FormControl sx={formControlStyle}>
            <InputLabel>
              Nationality <span className={styles.star}>*</span>
            </InputLabel>
            <Select
              value={nation}
              onChange={handleChange}
              label="Nationality"
              input={<BootstrapInput />}
              name="nation"
            >
              {countries.map((nation, i) => (
                <MenuItem value={nation.engName} key={i}>
                  {nation.engName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <PhoneFormRow
            ref={ref}
            nationData={nationData}
            onClick={handleSelectNationNumb}
            dropdown={dropdown}
            onClickDropdown={handleClickDropdown}
            onChangeSearch={handleSearchNation}
            onChange={handleOnChangePhone}
            phoneNumb={formatPhoneNumb}
          />

          <TextFormRow
            label={"E-mail"}
            placeholder={"Enter Your E-mail"}
            onChange={handleInputChange}
            name="email"
            value={account.email}
            checkEmpty={checkEmpty}
          />
          <PasswordFormRow
            label={"Password"}
            placeholder={"Enter Your Password"}
            name="password"
            onChange={handleInputChange}
            checkEmpty={checkEmpty}
          />
          <PasswordFormRow
            label={"Confirm Password"}
            placeholder={"Enter Your Password again"}
            checkEmpty={checkEmpty}
            name="confirmPassword"
            onChange={handleInputChange}
          />

          <div className={styles.notePassword}>
            <Box>Password Must :</Box>
            <p>- Use a minimum of 8 characters.</p>
            <p>- Include at least one number (0-9)</p>
          </div>

          <Button
            loading={loading}
            fullWidth
            variant="contained"
            type="submit"
            sx={{ ...formContentStyles, mb: 1 }}
            onClick={handleSubmit}
          >
            Create an Account
          </Button>
        </form>
        <Box sx={{ p: 1, width: "100%" }}>
          {errorMessage.map((message) => {
            return (
              <Box
                sx={{ color: "red", fontSize: "0.8rem", p: 0.3 }}
                key={message}
              >
                - {message}
              </Box>
            );
          })}
        </Box>
        <Box sx={{ ...formControlStyle, mt: 0, color: "black" }}>
          <Divider>OR</Divider>
        </Box>
        <Button
          fullWidth
          variant="outlined"
          type="submit"
          sx={{
            ...formContentStyles,
            mb: 4,
            border: "1px black solid",
            color: "black",
          }}
          onClick={() => router.push("/login")}
        >
          SIGN IN
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="body1" component="h2">
            {modalMessage}
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  "label + &": {
    marginTop: theme.spacing(1),
    fontWeight: 600,
  },
  "& .MuiInputBase-input": {
    borderRadius: 4,
    position: "relative",
    backgroundColor: white,
    border: `1px solid grey`,
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),

    "&:focus": {
      borderRadius: 4,
      borderColor: "#80bdff",
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      border: `1px solid ${primary}`,
    },
  },
}));

const formContentStyles = {
  width: "80%",
  m: "auto",
  mt: 3,
  fontWeight: 800,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "rgba(255, 255, 255, 0.9)",
  boxShadow: 24,
  p: 4,
};
