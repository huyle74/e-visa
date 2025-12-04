USE myevisa;

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- =========================================
-- Country
-- =========================================
CREATE TABLE `Country` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(191) NOT NULL,
  `engName` VARCHAR(191) NOT NULL,
  `iso2` VARCHAR(191) NOT NULL,
  `countryCode` VARCHAR(191) NULL,
  `from` TINYINT NOT NULL DEFAULT 0,
  `to` TINYINT NOT NULL DEFAULT 0,
  `governmentFee` DECIMAL(11, 2) NULL,
  `stayDays` INT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `Country_iso2_key` (`iso2`),
  UNIQUE KEY `Country_countryCode_key` (`countryCode`)
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- City
-- =========================================
CREATE TABLE `City` (
  `id` INT NOT NULL,
  `nationIso2` VARCHAR(191) NOT NULL,
  `country` VARCHAR(191) NOT NULL,
  `state` VARCHAR(191) NOT NULL,
  `city` VARCHAR(191) NOT NULL,

  PRIMARY KEY (`id`),

  -- @@index([nationIso2], map: "City_nationIso2_fkey")
  KEY `City_nationIso2_fkey` (`nationIso2`),

  CONSTRAINT `City_nationIso2_fkey`
    FOREIGN KEY (`nationIso2`)
    REFERENCES `Country` (`iso2`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- State
-- =========================================
CREATE TABLE `State` (
  `id` INT NOT NULL,
  `nationIso2` VARCHAR(191) NOT NULL,
  `country` VARCHAR(191) NOT NULL,
  `state` VARCHAR(191) NOT NULL,

  PRIMARY KEY (`id`),

  -- @@index([nationIso2], map: "State_nationIso2_fkey")
  KEY `State_nationIso2_fkey` (`nationIso2`),

  CONSTRAINT `State_nationIso2_fkey`
    FOREIGN KEY (`nationIso2`)
    REFERENCES `Country` (`iso2`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- Price
-- =========================================
CREATE TABLE `Price` (
  `id` INT NOT NULL,
  `type` VARCHAR(100) NOT NULL,
  `fee` DECIMAL(10, 2) NOT NULL,

  PRIMARY KEY (`id`)
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- Admin + Role enum
-- =========================================
CREATE TABLE `Admin` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `role` ENUM('ADMIN', 'SUPER_ADMIN') NOT NULL DEFAULT 'ADMIN',
  PRIMARY KEY (`id`)
  -- If you want email unique, uncomment:
  -- , UNIQUE KEY `Admin_email_key` (`email`)
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- User
-- =========================================
CREATE TABLE `User` (
  `id` CHAR(36) NOT NULL,                         -- String @id @default(uuid())
  `firstName` VARCHAR(191) NOT NULL,
  `lastName` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `password` VARCHAR(191) NOT NULL,
  `createAt` DATETIME(3) NOT NULL
      DEFAULT CURRENT_TIMESTAMP(3)
      ON UPDATE CURRENT_TIMESTAMP(3),            -- @updatedAt
  `phoneNumber` VARCHAR(191) NULL,
  `nationIso2` VARCHAR(191) NOT NULL,
  `emailVerify` TINYINT(1) NOT NULL DEFAULT 0,   -- Boolean @default(false)
  `verifyToken` VARCHAR(191) NULL,
  `managerId` INT NULL,

  PRIMARY KEY (`id`),

  UNIQUE KEY `User_verifyToken_key` (`verifyToken`),

  -- @@index([managerId])
  KEY `User_managerId_idx` (`managerId`),

  -- @@index([nationIso2], map: "User_nationIso2_fkey")
  KEY `User_nationIso2_fkey` (`nationIso2`),

  CONSTRAINT `User_managerId_fkey`
    FOREIGN KEY (`managerId`)
    REFERENCES `Admin` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,

  CONSTRAINT `User_nationIso2_fkey`
    FOREIGN KEY (`nationIso2`)
    REFERENCES `Country` (`iso2`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
