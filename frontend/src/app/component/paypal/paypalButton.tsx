import { Box } from "@mui/material";
import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { paypalClientId } from "@/app/server-side/envLoader";

type CreateOrder = PayPalButtonsComponentProps["createOrder"];

interface PaypalProps {
  price: number | string;
}

export default function PaypalButton({ price = 100 }: PaypalProps) {
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
        width: "50%",
      }}
    >
      <Box sx={{ mb: 2 }}>
        Pay <span style={{ fontWeight: 1000 }}>{price}$</span> To complete this
        application
      </Box>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons style={style} />
      </PayPalScriptProvider>
    </Box>
  );
}
