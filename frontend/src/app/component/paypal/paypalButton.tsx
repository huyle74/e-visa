import { Box, useMediaQuery } from "@mui/material";
import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { paypalClientId } from "@/app/server-side/envLoader";
import { ApplicationStatus } from "@/app/libs/types";
import EmailIcon from "@mui/icons-material/Email";
import { primary } from "@/app/libs/color-config";

interface PaypalProps {
  price: number | string | undefined;
  createOrder: PayPalButtonsComponentProps["createOrder"];
  onApprove: PayPalButtonsComponentProps["onApprove"];
  didPayed: string;
}

export default function PaypalButton({
  price,
  createOrder,
  onApprove,
  didPayed,
}: PaypalProps) {
  const matches = useMediaQuery("(max-width:600px)");
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: paypalClientId,
  };
  const style: PayPalButtonsComponentProps["style"] = {
    color: "blue",
    tagline: false,
    shape: "rect",
  };
  return (
    <Box
      className="App"
      sx={{
        width: matches ? "90%" : "50%",
        height: matches ? "40vh" : "100%",
      }}
    >
      {didPayed === ApplicationStatus.COMPLETED ? (
        <Statement />
      ) : (
        <>
          <Box sx={{ mb: 2, fontSize: matches ? "1rem" : "1.3rem" }}>
            Pay <span style={{ fontWeight: 1000 }}>{price}$</span> To complete
            this application
          </Box>
          <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons
              style={style}
              createOrder={createOrder}
              onApprove={onApprove}
            />
          </PayPalScriptProvider>
        </>
      )}
    </Box>
  );
}

const Statement = () => {
  return (
    <Box
      sx={{
        border: `2px solid ${primary}`,
        p: 4,
        borderRadius: "10vh",
        height: "20vh",
        width: "40vw",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Box
        sx={{
          fontSize: "2rem",
          textAlign: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        Please check your Email to receive your visa result!
        <span>
          <EmailIcon color="primary" fontSize="large" />
        </span>
      </Box>
    </Box>
  );
};
