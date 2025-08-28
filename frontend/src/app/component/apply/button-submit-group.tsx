import { Box, Button } from "@mui/material";

interface ButtonSubmitProps {
  onClickNext: () => void;
  onClickBack?: () => void;
  displayBackButton?: boolean;
  loading?: boolean;
}

const ButtonSumbit = ({
  onClickNext,
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
        onClick={onClickNext}
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
