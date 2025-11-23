import { MouseEventHandler } from "react";
import { Box, Button } from "@mui/material";
import { useMobileMedia } from "@/app/contexts/mobileResponsiveProvider";

interface ButtonSubmitProps {
  onclickNext: MouseEventHandler<HTMLButtonElement>;
  onClickBack?: () => void;
  displayBackButton?: boolean;
  loading?: boolean;
}

const ButtonSubmit = ({
  onclickNext,
  onClickBack,
  displayBackButton = false,
  loading = false,
}: ButtonSubmitProps) => {
  const { matches } = useMobileMedia();
  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
      {displayBackButton ? (
        <Button
          onClick={onClickBack}
          variant="contained"
          color="secondary"
          size={matches ? "small" : "large"}
        >
          BACK
        </Button>
      ) : (
        <Box></Box>
      )}
      <Button
        onClick={onclickNext}
        variant="contained"
        size={matches ? "small" : "large"}
        loading={loading}
        type="submit"
      >
        NEXT
      </Button>
    </Box>
  );
};
export default ButtonSubmit;
