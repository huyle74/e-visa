import { PayPalButtons, PayPalScriptProvider, ReactPayPalScriptOptions, PayPalButtonsComponentProps } from "@paypal/react-paypal-js";
import { paypalClientId } from "@/app/server-side/envLoader";

type CreateOrder = PayPalButtonsComponentProps["createOrder"];

export default function PaypalButton(createOrder: CreateOrder) {
  const initialOptions: ReactPayPalScriptOptions = {
    clientId: paypalClientId,
  };

  const style: PayPalButtonsComponentProps["style"] = {
    color: "blue",
    tagline: false,
  };

  return (
    <div className="App">
      <PayPalScriptProvider options={initialOptions}>
        <PayPalButtons style={style} createOrder={createOrder} />
      </PayPalScriptProvider>
    </div>
  );
}
