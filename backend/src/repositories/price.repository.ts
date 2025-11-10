import prisma from "@/prisma/prisma";

const priceRepo = {
  async getServiceFee() {
    try {
      const fee = await prisma.price.findMany();

      return fee;
    } catch (error) {
      console.error(error);
    }
  },
};

export default priceRepo;
