import jwt, { SignOptions } from "jsonwebtoken";
import { JWT_PRIVATE_KEY, JWT_PUBLIC_KEY } from "../config/envLoader";
import { generateKeyPairSync } from "crypto";

const generateToken = (payload: object, expiresIn?: SignOptions["expiresIn"]) => {
  const options: SignOptions = { algorithm: "ES256" };

  if (expiresIn !== undefined) {
    options.expiresIn = expiresIn;
  }

  const token = jwt.sign(payload, JWT_PRIVATE_KEY, options);

  return token;
};

const verify = (token: string) => {
  const decode = jwt.verify(token, JWT_PUBLIC_KEY, { algorithms: ["ES256"] });
  return decode;
};

export { generateToken, verify };

// const { publicKey, privateKey } = generateKeyPairSync("ec", {
//     namedCurve: "P-256",
//     publicKeyEncoding: { type: "spki", format: "pem" },
//     privateKeyEncoding: { type: "pkcs8", format: "pem" },
//   });
//   console.log(privateKey, publicKey);
