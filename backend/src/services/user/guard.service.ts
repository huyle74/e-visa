import { verify } from "@/utils/jwt";

const guardService = async (accessToken: string) => {
  const decode = verify(accessToken);

  if (decode) {
    return true;
  } else return false;
};

export default guardService;
