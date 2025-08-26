import { visaApplicationRepo } from "@/repositories/visaApplication.repository";
import { checkUser } from "./util";

const visaApplicationService = async (userId: string, user: any) => {
  if (!userId) throw new Error("User Param not found");

  const email = user.email;
  const checkAuth = await checkUser(`${email}`, userId);
  if (checkAuth === false) throw new Error("Cannot authenticate this user");

  const listAll = await visaApplicationRepo.listAll(userId);

  console.log(listAll);

  const results = listAll.map((rows) => {
    const firstName = rows.ApplyInformation?.firstName || "";
    const familyName = rows.ApplyInformation?.familyName || "";

    return {
      id: rows.correlationId,
      applyAt: rows.Eligibility?.applyAt,
      visaType: rows.Eligibility?.visaType,
      createAt: rows.createdAt,
      fullName: familyName + firstName,
      nationality: rows.ApplyInformation?.nationality,
      documentNo: rows.ApplyInformation?.documentNumber,
      birthDate: rows.ApplyInformation?.birthDate,
    };
  });

  return results;
};

export default visaApplicationService;
