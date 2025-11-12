import { paypalCredentials, paypalApiUrl } from "@/config/envLoader";
import { visaApplicationRepo } from "../../repositories/visaApplication.repository";

const { client_id, client_secret } = paypalCredentials;

interface CreateOrderProps {
  applicationId: string;
  price: string | number;
  from: string;
  to: string;
}

const paypalService = {
  async createOrder(data: CreateOrderProps) {
    const { applicationId, price } = data;
    const endpoint = paypalApiUrl + "v2/checkout/orders";
    const payload = {
      intent: "CAPTURE",
      payment_source: {
        paypal: {
          experience_context: {
            payment_method_preference: "IMMEDIATE_PAYMENT_REQUIRED",
            landing_page: "LOGIN",
            shipping_preference: "GET_FROM_FILE",
            user_action: "PAY_NOW",
            return_url: "https://example.com/returnUrl",
            cancel_url: "https://example.com/cancelUrl",
          },
        },
      },
      purchase_units: [
        {
          invoice_id: applicationId,
          amount: {
            currency_code: "USD",
            value: price,
          },
        },
      ],
    };
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error: ${response.status} - ${error}`);
      }

      const result = await handleResponse(response);
      return result;
    } catch (error) {
      console.error("createOrder", error);
    }
  },
  async captureOrder(orderId: string, applicationId: string) {
    try {
      const endpoint =
        paypalApiUrl + "v2/checkout/orders/" + orderId + "/capture";
      const accessToken = await getAccessToken();

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error: ${response.status} - ${error}`);
      }

      const result = await handleResponse(response);
      if (result.status === "COMPLETED") {
        const update = await visaApplicationRepo.update(applicationId, true);
        console.log(update);
        return result;
      }
    } catch (error) {
      console.error("Capture Order", error);
    }
  },
};

async function handleResponse(response: Response) {
  try {
    const jsonResponse = await response.json();

    return jsonResponse;
  } catch (err) {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}

async function getAccessToken() {
  const endpoint = paypalApiUrl + "v1/oauth2/token";
  const auth = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: new URLSearchParams({ grant_type: "client_credentials" }),
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Error: ${response.status} - ${error}`);
    }

    const results = await response.json();
    return results.access_token;
  } catch (error) {
    console.error(error);
  }
}

function getAuthAssertionValue(sellerPayerId: string) {
  const header = {
    alg: "none",
  };
  const encodedHeader = base64url(header);
  const payload = {
    iss: client_id,
    payer_id: sellerPayerId,
  };
  const encodedPayload = base64url(payload);
  return `${encodedHeader}.${encodedPayload}.`;
}

function base64url(json: object) {
  return btoa(JSON.stringify(json))
    .replace(/=+$/, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

const jwt = getAuthAssertionValue("sellerPayerId");

export default paypalService;
