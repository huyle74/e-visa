import { verify } from "@/utils/jwt";

const guardService = async (accessToken: string) => {
  const decode = verify(accessToken);

  console.log(decode);

  if (decode) {
    return true;
  } else return false;
};

export default guardService;
