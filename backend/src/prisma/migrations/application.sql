-- USE your_database_name;

SET FOREIGN_KEY_CHECKS = 0;

-- =========================================
-- Application
-- =========================================
CREATE TABLE `Application` (
  `correlationId` VARCHAR(191) NOT NULL DEFAULT '',
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
  `userId` CHAR(36) NOT NULL,
  `fromCountry` VARCHAR(191) NOT NULL,
  `toCountry` VARCHAR(191) NOT NULL,
  `price` INT NOT NULL,
  `payment` TINYINT NULL,

  PRIMARY KEY (`correlationId`),

  KEY `Application_userId_fkey` (`userId`),

  CONSTRAINT `Application_userId_fkey`
    FOREIGN KEY (`userId`)
    REFERENCES `User` (`id`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- SupportingDocument + Document enum
-- =========================================
CREATE TABLE `SupportingDocument` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `applicationId` VARCHAR(191) NOT NULL,
  `type` ENUM(
    'BIODATA',
    'PHOTOGRAPH',
    'CURRENT_LOCATION',
    'BOOKING_CONFIRMATION',
    'PROOF_OF_ACCOMMODATION',
    'FINANCIAL_EVIDENCE'
  ) NOT NULL,
  `originalName` VARCHAR(191) NOT NULL,
  `mimeType` VARCHAR(191) NOT NULL,
  `sizeBytes` INT NOT NULL,
  `storageKey` VARCHAR(191) NOT NULL,
  `fileUrl` VARCHAR(1000) NULL,
  `sha256` VARCHAR(191) NULL,
  `meta` LONGTEXT NULL,
  `uploadedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `SupportingDocument_applicationId_type_key` (`applicationId`, `type`),
  KEY `SupportingDocument_applicationId_idx` (`applicationId`),
  KEY `SupportingDocument_uploadedAt_idx` (`uploadedAt`),

  CONSTRAINT `SupportingDocument_applicationId_fkey`
    FOREIGN KEY (`applicationId`)
    REFERENCES `Application` (`correlationId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- TravelInformation
-- =========================================
CREATE TABLE `TravelInformation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `applicationId` VARCHAR(191) NOT NULL,
  `arrivalDate` DATETIME(3) NOT NULL,
  `departureDate` DATETIME(3) NOT NULL,
  `country` VARCHAR(191) NOT NULL,
  `arrivalPort` VARCHAR(191) NOT NULL,
  `hadVisited` TINYINT(1) NOT NULL,
  `didApply` TINYINT(1) NOT NULL,
  `partOfTour` TINYINT(1) NOT NULL,
  `transportationVehicle` VARCHAR(191) NULL,
  `transportMode` VARCHAR(191) NOT NULL,
  `shipName` VARCHAR(191) NOT NULL,
  `fightNo` VARCHAR(191) NOT NULL,
  `vehicleNumber` VARCHAR(191) NOT NULL,
  `additionalAccommodation` TINYINT(1) NOT NULL DEFAULT 0,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  UNIQUE KEY `TravelInformation_applicationId_key` (`applicationId`),
  KEY `TravelInformation_id_idx` (`id`),

  CONSTRAINT `TravelInformation_applicationId_fkey`
    FOREIGN KEY (`applicationId`)
    REFERENCES `Application` (`correlationId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- Accommodation
-- =========================================
CREATE TABLE `Accommodation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `travelInformationId` INT NOT NULL,
  `type` VARCHAR(191) NOT NULL,
  `name` VARCHAR(191) NOT NULL,
  `street` VARCHAR(191) NOT NULL,
  `city` VARCHAR(191) NOT NULL,
  `contactNo` VARCHAR(191) NOT NULL,
  `duration` VARCHAR(191) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

  PRIMARY KEY (`id`),

  KEY `Accommodation_travelInformationId_idx` (`travelInformationId`),

  CONSTRAINT `Accommodation_travelInformationId_fkey`
    FOREIGN KEY (`travelInformationId`)
    REFERENCES `TravelInformation` (`id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- ApplyInformation + enums
-- =========================================
CREATE TABLE `ApplyInformation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `applicationId` VARCHAR(191) NOT NULL,
  `biodata` LONGTEXT NULL,
  `photograph` LONGTEXT NULL,
  `title` VARCHAR(191) NOT NULL,
  `sex` ENUM('MALE', 'FEMALE', 'OTHER') NOT NULL,
  `firstName` VARCHAR(191) NOT NULL,
  `middleName` VARCHAR(191) NULL,
  `familyName` VARCHAR(191) NOT NULL,
  `contactNo` VARCHAR(191) NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `nationality` VARCHAR(191) NOT NULL,
  `otherNationality` TINYINT(1) NOT NULL,
  `nationalityBirth` VARCHAR(191) NOT NULL,
  `cityBirth` VARCHAR(191) NOT NULL,
  `birthDate` DATETIME(3) NOT NULL,
  `maritalStatus` ENUM(
    'SINGLE',
    'MARRIED',
    'COMMON_LAW_MARRIAGE',
    'CIVIL_UNION_DOMESTIC_PARTNERSHIP',
    'WIDOWED',
    'DIVORCED',
    'SEPARATED'
  ) NOT NULL,
  `anotherNationality` VARCHAR(191) NOT NULL,
  `documentType` ENUM(
    'CERTIFICATE_OF_IDENTITY_CI',
    'PASSPORT',
    'SEAMANS_BOOK',
    'TRAVEL_DOCUMENT'
  ) NOT NULL,
  `documentNumber` VARCHAR(191) NOT NULL,
  `issuesPlace` VARCHAR(191) NOT NULL,
  `issuesDate` DATETIME(3) NOT NULL,
  `expiryDate` DATETIME(3) NOT NULL,
  `homeAddress` VARCHAR(191) NOT NULL,
  `addressCountry` VARCHAR(191) NOT NULL,
  `addressState` VARCHAR(191) NOT NULL,
  `addressCity` VARCHAR(191) NOT NULL,
  `currentAddress` TINYINT(1) NOT NULL,
  `occupation` ENUM(
    'BUSINESS_OWNER',
    'EMPLOYEE',
    'FREELANCE',
    'GOVERNMENT_OFFICIAL',
    'RETIRED',
    'STUDENT',
    'UNEMPLOYED',
    'OTHER'
  ) NOT NULL,
  `company` VARCHAR(191) NOT NULL,
  `annualIncome` ENUM(
    'UNDER_20000_USD',
    'BETWEEN_20000_40000_USD',
    'BETWEEN_40001_60000_USD',
    'BETWEEN_60001_80000_USD',
    'MORE_THAN_AND_OVER',
    'NO_INCOME'
  ) NOT NULL,

  PRIMARY KEY (`id`),

  UNIQUE KEY `ApplyInformation_applicationId_key` (`applicationId`),
  KEY `ApplyInformation_id_idx` (`id`),

  CONSTRAINT `ApplyInformation_applicationId_fkey`
    FOREIGN KEY (`applicationId`)
    REFERENCES `Application` (`correlationId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

-- =========================================
-- Eligibility + enums
-- =========================================
CREATE TABLE `Eligibility` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `applyAt` VARCHAR(191) NOT NULL,
  `currentLocation` VARCHAR(191) NOT NULL,
  `documentType` ENUM(
    'ORDINARY_TRAVEL_DOCUMENT',
    'DIPLOMATIC_PASSPORT',
    'OFFICIAL_SERVICE_PASSPORT',
    'PUBLIC_AFFAIRS'
  ) NOT NULL,
  `inputCountryPassport` VARCHAR(191) NOT NULL,
  `numberOfEntries` VARCHAR(191) NOT NULL,
  `visaType` ENUM(
    'TOURIST',
    'TRANSIT',
    'NON_IMMIGRANT',
    'SMART',
    'COURTESY',
    'LTR',
    'DTV',
    'THAILAND_PRIVILEGE_CARD'
  ) NOT NULL,
  `visitPurpose` ENUM(
    'VISIT_FAMILY',
    'TRAVEL',
    'FOR_WORK'
  ) NOT NULL,
  `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
  `applicationId` VARCHAR(191) NOT NULL,

  PRIMARY KEY (`id`),

  UNIQUE KEY `Eligibility_applicationId_key` (`applicationId`),
  KEY `Eligibility_id_idx` (`id`),

  CONSTRAINT `Eligibility_applicationId_fkey`
    FOREIGN KEY (`applicationId`)
    REFERENCES `Application` (`correlationId`)
    ON DELETE CASCADE
    ON UPDATE CASCADE
) ENGINE=InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;
