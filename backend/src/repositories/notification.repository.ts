import { NotificationUser } from "@/generate/prisma/client";
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
  async list(userId: string) {
    try {
      const notify = await prisma.notificationUser.findMany({
        where: { userId },
      });
      return notify;
    } catch (error) {
      console.error(error);
      throw new Error("failed to get notification list");
    }
  },
};

export default notificationRepo;
