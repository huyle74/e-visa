import userRepos from "@/repositories/user.repository";
import { OAuth2Client } from "google-auth-library";
import verifyGoogleTokenId from "@/utils/verifyGoogleTokenId";
import { generateToken, verify } from "../../utils/jwt";
import { googleCredentials } from "@/config/envLoader";

const AuthClient = new OAuth2Client({
  clientId: googleCredentials.clientId,
  redirectUri: googleCredentials.redirectUri,
  clientSecret: googleCredentials.clientSecret,
});

const googleLoginService = {
  async login(credentials: any) {
    const id_token = credentials?.id_token;
    const payload = await verifyGoogleTokenId(id_token);
    if (!payload) throw new Error("Failed to verify google token id");

    const email = payload.email || "";
    const firstName = payload.given_name || "";
    const lastName = payload.family_name || "";
    const accessToken = generateToken({ email, firstName, lastName });

    const checkUserExist = await userRepos.findByEmail(email);
    if (!checkUserExist) {
      const user = {
        email,
        firstName,
        lastName,
        emailVerify: payload.email_verified || false,
        password: "null",
        verifyToken: accessToken,
      };
      const createUser = await userRepos.create({
        ...user,
        nation: { connect: { iso2: "null" } },
      });
      return createUser;
    }
    return { id: checkUserExist.id, accessToken };
  },
  async getLoginUrl() {
    const api = AuthClient.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: ["openid", "email", "profile"],
    });

    if (!api) throw new Error("Cannot get URL");

    return api;
  },

  async loginCallBack(userEmail: string) {
    const user = await userRepos.findByEmail(userEmail);

    if (!user) throw new Error("User not found");

    const { verifyToken, ...rest } = user;
    const accessToken = generateToken(rest);

    return { ...rest, accessToken };
  },
};

export default googleLoginService;
