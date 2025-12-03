-- ENUMS handled inline in MySQL

-- TABLE: Notifications
CREATE TABLE `Notifications` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `type` ENUM('RESULT', 'EMAIL', 'CHAT') NOT NULL,
    `adminId` INT NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX `fk_notifications_admin_id_001` (`adminId`)
);

-- TABLE: NotificationUser
CREATE TABLE `NotificationUser` (
    `id` CHAR(36) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `status` ENUM('READ', 'UNREAD') DEFAULT 'UNREAD',
    `message` TEXT NOT NULL,
    `readAt` DATETIME(0),
    `title` VARCHAR(255) NOT NULL,
    `notificationsId` INT NOT NULL,
    `createAt` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    INDEX (`userId`)
);

-- FOREIGN KEYS
ALTER TABLE `Notifications`
ADD CONSTRAINT `notifications_admin_fk`
FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`);

ALTER TABLE `NotificationUser`
ADD CONSTRAINT `notificationuser_user_fk`
FOREIGN KEY (`userId`) REFERENCES `User`(`id`);

ALTER TABLE `NotificationUser`
ADD CONSTRAINT `notificationuser_notifications_fk`
FOREIGN KEY (`notificationsId`) REFERENCES `Notifications`(`id`);
