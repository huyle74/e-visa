import notificationRepo from "@/repositories/notification.repository";

const userHomeService = {
  async homePage(userId: string) {
    const notifications = await notificationRepo.list(userId);

    return { data: { notifications } };
  },
};

export default userHomeService;
