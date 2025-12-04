USE myevisa;

SET FOREIGN_KEY_CHECKS = 0;

-- =========================================
-- Notifications + NotificationType enum
-- =========================================
CREATE TABLE `Notifications` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `type` ENUM('RESULT', 'EMAIL', 'CHAT') NOT NULL,
  `adminId` INT NOT NULL,
  `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),

  -- @@index([adminId], map: "fk_notifications_admin_id_001")
  KEY `fk_notifications_admin_id_001` (`adminId`),

  CONSTRAINT `notifications_admin_fk`
    FOREIGN KEY (`adminId`)
    REFERENCES `Admin` (`id`)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- NotificationUser + Status enum
-- =========================================
CREATE TABLE `NotificationUser` (
  `id` CHAR(36) NOT NULL,
  `userId` CHAR(36) NOT NULL,
  `status` ENUM('READ', 'UNREAD') NULL DEFAULT 'UNREAD',
  `message` TEXT NOT NULL,
  `readAt` DATETIME(0) NULL,
  `title` VARCHAR(255) NOT NULL,
  `notificationsId` INT NOT NULL,
  `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),

  -- @@index([notificationsId], map: "notificationuser_notifications_fk")
  KEY `notificationuser_notifications_fk` (`notificationsId`),

  -- @@index([userId], map: "userId")
  KEY `userId` (`userId`),

  CONSTRAINT `notificationuser_user_fk`
    FOREIGN KEY (`userId`)
    REFERENCES `User` (`id`)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT,

  CONSTRAINT `notificationuser_notifications_fk`
    FOREIGN KEY (`notificationsId`)
    REFERENCES `Notifications` (`id`)
    ON UPDATE RESTRICT
    ON DELETE RESTRICT
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
