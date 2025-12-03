import { NotificationUser } from "@/generate/prisma";
import prisma from "@/prisma/prisma";
const notificationRepo = {
  async createUseNotification(
    data: Omit<NotificationUser, "createAt" | "readAt" | "id">
  ) {
    try {
      const createNotification = await prisma.notificationUser.create({
        data,
      });
      return createNotification;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to created user notification");
    }
  },
};

export default notificationRepo;
