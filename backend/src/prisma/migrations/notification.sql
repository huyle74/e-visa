CREATE TABLE IF NOT EXISTS `Notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` ENUM('RESULT', 'EMAIL', 'CHAT') NOT NULL,
  `adminId` INT NOT NULL,
  `createAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `NotificationUser` (
  `id` VARCHAR(191) NOT NULL,
  `user` INT NOT NULL,
  `status` ENUM('READ', 'UNREAD') NOT NULL,
  `message` TEXT NOT NULL,
  `readAt` DATETIME NULL,
  `title` VARCHAR(191) NOT NULL,
  `notificationsId` INT NOT NULL,
  `createAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

-- ============================
-- FOREIGN KEYS (Renamed!)
-- ============================

ALTER TABLE `Notifications`
ADD CONSTRAINT `fk_notifications_admin_id_001`
FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `NotificationUser`
ADD CONSTRAINT `fk_notifuser_user_id_002`
FOREIGN KEY (`user`) REFERENCES `User`(`id`)
ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `NotificationUser`
ADD CONSTRAINT `fk_notifuser_notifications_id_003`
FOREIGN KEY (`notificationsId`) REFERENCES `Notifications`(`id`)
ON DELETE CASCADE ON UPDATE CASCADE;
