import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allowList = [
  { engName: "India", iso2: "IN", fee: 80, stayDays: 60 },
  { engName: "Vietnam", iso2: "VN", fee: 25, stayDays: 90 },
  { engName: "United Kingdom", iso2: "GB", fee: 173, stayDays: 180 },
  { engName: "Australia", iso2: "AU", fee: 0, stayDays: 0 },
  { engName: "United Arab Emirates", iso2: "AE", fee: 86, stayDays: 30 },
  { engName: "China", iso2: "CN", fee: 60, stayDays: 30 },
  { engName: "Sri Lanka", iso2: "LK", fee: 55, stayDays: 30 },
  { engName: "Bahrain", iso2: "BH", fee: 24, stayDays: 14 },
  { engName: "Cambodia", iso2: "KH", fee: 36, stayDays: 30 },
  { engName: "Azerbaijan", iso2: "AZ", fee: 25, stayDays: 30 },
  { engName: "Colombia", iso2: "CO", fee: 82, stayDays: 90 },
  { engName: "Armenia", iso2: "AM", fee: 8, stayDays: 21 },
  { engName: "Albania", iso2: "AL", fee: 180, stayDays: 90 },
];

async function addFeeAndDestination() {
  try {
    allowList.map(async ({ iso2, fee, stayDays }) => {
      await prisma.country.update({
        where: { iso2 },
        data: { from: true, to: true, stayDays, governmentFee: fee },
      });
    });
  } catch (error) {
    console.log(error);
  }
}
addFeeAndDestination();
