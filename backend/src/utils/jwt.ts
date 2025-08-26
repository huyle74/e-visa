import jwt from "jsonwebtoken";
import { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } from "../config/envLoader";
import { generateKeyPairSync } from "crypto";

const generateToken = (payload: object) => {
  const token = jwt.sign(payload, JWT_PRIVATE_KEY, { algorithm: "ES256" });

  return token;
};

const verify = (token: string) => {
  const decode = jwt.verify(token, JWT_PUBLIC_KEY);
  return decode;
};

export { generateToken, verify };

// const { publicKey, privateKey } = generateKeyPairSync("ec", {
//     namedCurve: "P-256",
//     publicKeyEncoding: { type: "spki", format: "pem" },
//     privateKeyEncoding: { type: "pkcs8", format: "pem" },
//   });
//   console.log(privateKey, publicKey);
