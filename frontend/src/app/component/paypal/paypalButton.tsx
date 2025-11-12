import { Box } from "@mui/material";
import {
  PayPalButtons,
  PayPalScriptProvider,
  ReactPayPalScriptOptions,
  PayPalButtonsComponentProps,
} from "@paypal/react-paypal-js";
import { paypalClientId, backend_url } from "@/app/server-side/envLoader";

interface PaypalProps {
  price: number | string | undefined;
  createOrder: PayPalButtonsComponentProps["createOrder"];
  onApprove: PayPalButtonsComponentProps["onApprove"];
}

export default function PaypalButton({
  price,
  createOrder,
  onApprove,
}: PaypalProps) {
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
      <Box sx={{ mb: 2, fontSize: "1.3rem" }}>
        Pay <span style={{ fontWeight: 1000 }}>{price}$</span> To complete this
        application
      </Box>
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons
          style={style}
          createOrder={createOrder}
          onApprove={onApprove}
        />
      </PayPalScriptProvider>
    </Box>
  );
}
