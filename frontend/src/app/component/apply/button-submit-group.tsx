import { MouseEventHandler } from "react";
import { Box, Button } from "@mui/material";

interface ButtonSubmitProps {
  onclickNext: MouseEventHandler<HTMLButtonElement>;
  onClickBack?: () => void;
  displayBackButton?: boolean;
  loading?: boolean;
}

const ButtonSumbit = ({
  onclickNext,
  onClickBack,
  displayBackButton = false,
  loading = false,
}: ButtonSubmitProps) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      {displayBackButton ? (
        <Button onClick={onClickBack} variant="contained" color="secondary">
          BACK
        </Button>
      ) : (
        <Box></Box>
      )}
      <Button
        onClick={onclickNext}
        variant="contained"
        size="large"
        loading={loading}
        type="submit"
      >
        NEXT
      </Button>
    </Box>
  );
};
export default ButtonSumbit;
