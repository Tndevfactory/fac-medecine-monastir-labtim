-- Table: users
CREATE TABLE `users` (
  `id` char(36) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','member') DEFAULT 'member',
  `name` varchar(255) DEFAULT NULL,
  `position` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `orcid` varchar(255) DEFAULT NULL,
  `biography` text,
  `expertises` JSON,
  `researchInterests` JSON,
  `universityEducation` JSON,
  `mustChangePassword` tinyint(1) NOT NULL DEFAULT '1',
  `expirationDate` date DEFAULT NULL,
  `isArchived` tinyint(1) NOT NULL DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpire` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_orcid_unique` (`orcid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `users` VALUES 
('4f1b778b-7c36-4a41-9860-8c16a3ffe4b3','tarekzaafrane@gmail.com','$2a$10$pzdgx1/mfrksMI765rWNZOGTlYRFc/.cnJc6ygBf4.0akUcjqLuTO','member','Tarek Zaafrane UPDATE','Dev Full Stack','99 000 000','/uploads/profile_images/radiologist-1756114110801.jpg',NULL,'Biographie Tarek','["ReactJS"]','["Web"]','["TEST"]',0,'2030-07-08',0,'2025-07-04 11:52:56','2025-08-25 09:28:30',NULL,NULL),
('5bc0ddfb-5952-4693-aef6-9f5c22bf38b8','test_15_07@gmail.com','$2a$10$NFs5YES6BFy.gqzBzD3k4.zxb4Ur1bZrmcLx.jQ1aadvj4UrJyFaa','member','test_15_07',NULL,NULL,'/uploads/profile_images/audience-citizen_0-1752584981160.jpg',NULL,NULL,'[]','[]','[]',1,'2030-07-15',0,'2025-07-15 13:09:12','2025-07-15 13:09:41',NULL,NULL),
('6b348808-e56a-47d8-81e5-fa6be2cdcd50','t@example.com','$2a$10$tP99I1kq52dti1UyQrTK9e.nfM1lK4bs/tVg/bxlnxMx6QiVNg5mG','member','TEST TEST','PhD StudentTT','99179378','/uploads/profile_images/audience-citizen_0-1751465497100.jpg','032-895','test biographie','["IT"]','["IT"]','["TTTT"]',1,'1970-01-01',0,'2025-07-02 14:11:37','2025-07-15 12:42:37',NULL,NULL),
('a84f8c0e-2e00-4599-92d6-f9b5bcb15415','aymen@example.com','$2a$10$u97uA0jGiSd7YKc25zWYxOTvh7wbZeseHbqr0ZlSPg9FDKy1mb5JO','member','Aymen',NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',1,'1970-01-01',0,'2025-07-02 12:45:10','2025-07-02 12:51:26',NULL,NULL),
('c597a956-92c6-42c2-9b4d-b575eda4a1d5','ttt@gmail.com','$2a$10$D.P9s820Yd0SOq0ZbKC4He/NQ2aITMd5UiPAAJmz9umdvJ.X9wFxW','member',NULL,NULL,NULL,NULL,NULL,NULL,'[]','[]','[]',1,'1970-01-01',0,'2025-07-02 12:44:01','2025-07-02 12:44:56',NULL,NULL),
('f4e9806b-a3b7-46e8-bbe0-e45cb6b0852d','test@tarek.com','$2a$10$GImSCXGrGPnucqD9Lv1Ftur/.872jrnTg8XzQMforvju2XXCb/hU.','admin','Tarek Zaafrane',NULL,NULL,NULL,NULL,NULL,NULL,NULL,NULL,0,'2030-07-16',0,'2025-07-02 12:41:16','2025-07-16 14:03:06',NULL,NULL);


-- Table: actus
CREATE TABLE `actus` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL DEFAULT '',
  `image` varchar(255) DEFAULT NULL,
  `date` date NOT NULL,
  `category` enum('Conférence','Formation','Laboratoire') NOT NULL,
  `shortDescription` varchar(500) NOT NULL,
  `fullContent` text,
  `userId` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `actus_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `actus` VALUES 
('b9c2c081-968a-4b37-a879-79549b933062','Test Actualité Laboratoire','/uploads/actu_images/ribat_monastir-1751465540343.png','2025-07-02','Laboratoire','Test Desc Actualité Laboratoire','<p>Test Contenu Actualité Laboratoire</p>','f4e9806b-a3b7-46e8-bbe0-e45cb6b0852d','2025-07-02 14:12:20','2025-08-25 10:55:28'),
('d7ec22b2-412d-4a9f-b41f-566adfb518c9','Test Actualité Conférence','/uploads/actu_images/evolution-1752748693841.png','2025-07-18','Conférence','Test Description Actualité Conférence','<p>Test Contenu Actualité Conférence</p>','f4e9806b-a3b7-46e8-bbe0-e45cb6b0852d','2025-07-17 10:38:13','2025-08-25 10:54:31'),
('dd4ec9a7-c43e-402f-ae6e-99128641ae65','Test Actualité Formation','/uploads/actu_images/hero-background-1752748241857.jpg','2025-07-17','Formation','Test Description Actualité Formation','<p>Test <strong>Contenu</strong> Actualité Formation</p><p><br></p><p><s><u>Test </u></s><strong><s><u>Contenu</u></s></strong><s><u> Actualité Formation</u></s></p>','f4e9806b-a3b7-46e8-bbe0-e45cb6b0852d','2025-07-17 10:30:41','2025-08-25 10:53:37');


-- Table: sequelize_meta
CREATE TABLE `sequelize_meta` (
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;

INSERT INTO `sequelize_meta` VALUES 
('1.js'),('2.js'),('20250620110811-remove-student-supervisor-ids.js'),('20250625095810-update-presentation-content-for-blocks.js'),('20250704090116-create_hero_table.js'),('20250709105930-add_reset_password_fields_to_users.js');


-- Table: carousel_items
CREATE TABLE `carousel_items` (
  `id` char(36) NOT NULL,
  `imageUrl` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `order` int NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `order` (`order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `carousel_items` VALUES 
('069b5945-ad05-4bae-9a0d-d0dc94e6c305','/app/uploads/carousel_images/audience-citizen_0-1751465797824.jpg','Carousel ITEM 4','Carousel ITEM 1',1,NULL,'2025-07-02 14:16:37','2025-07-04 13:30:38'),
('1de7e65e-a1b5-4f20-b51f-f1814b44bf2e','/app/uploads/carousel_images/hero-background-1751618890769.jpg','Carousel ITEM 78','Carousel ITEM 1',2,NULL,'2025-07-02 14:16:24','2025-07-04 13:30:38');


-- Table: events
CREATE TABLE `events` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `date` date NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `userId` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `events_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Table: heroes
CREATE TABLE `heroes` (
  `id` char(36) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text,
  `buttonContent` varchar(255) DEFAULT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;


-- Table: mastersis
CREATE TABLE `mastersis` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `summary` text NOT NULL,
  `type` enum('Master','PFE') NOT NULL,
  `etablissement` varchar(255) NOT NULL,
  `specialite` varchar(255) NOT NULL,
  `encadrant` varchar(255) NOT NULL,
  `membres` text,
  `userId` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `mastersis_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `mastersis` VALUES 
('0b9261a7-7009-4a20-9f4f-40497db7791d','Master Tarekkk','Tarek',2025,'Résumé Tarek','Master','FMM','FMMM','test','["Tarek"]','f4e9806b-a3b7-46e8-bbe0-e45cb6b0852d','2025-07-02 14:16:01','2025-08-25 10:59:42'),
('7f2ebb34-c55b-4176-bac6-6cd1b5a62e06','Master/PFEEEE Tarek','Tarek Zaafrane',2025,'Master/PFE description','PFE','FMM','FMMM','test','["Jury1"]','4f1b778b-7c36-4a41-9860-8c16a3ffe4b3','2025-07-08 13:03:07','2025-08-25 10:59:53');


-- Table: presentation_content
CREATE TABLE `presentation_content` (
  `id` char(36) NOT NULL,
  `sectionName` varchar(255) NOT NULL,
  `contentBlocks` text NOT NULL,
  `directorName` varchar(255) DEFAULT NULL,
  `directorPosition` varchar(255) DEFAULT NULL,
  `directorImage` varchar(255) DEFAULT NULL,
  `counter1Value` int DEFAULT '0',
  `counter1Label` varchar(255) DEFAULT 'Permanents',
  `counter2Value` int DEFAULT '0',
  `counter2Label` varchar(255) DEFAULT 'Articles impactés',
  `counter3Value` int DEFAULT '0',
  `counter3Label` varchar(255) DEFAULT 'Articles publiés',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sectionName` (`sectionName`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `presentation_content` VALUES 
('1ecf6e3e-25cd-4a58-81e7-bc2212971cd6','main_presentation','[{\"id\":\"7a43deec-6596-45f7-94af-232c76eba03f\",\"type\":\"text\",\"value\":\"<p><span style=\\\"background-color: rgb(255, 255, 204);\\\">Description Laboratoire</span></p>\"}]','Hedi Bedoui','Directeur Laboratoire LABTIM',NULL,24,'Permanents',50,'Articles impactés',300,'Articles publiés','2025-08-22 10:54:22','2025-08-25 11:02:23');


-- Table: publications
CREATE TABLE `publications` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `authors` text NOT NULL,
  `journal` varchar(255) DEFAULT NULL,
  `year` int NOT NULL,
  `volume` varchar(255) DEFAULT NULL,
  `pages` varchar(255) DEFAULT NULL,
  `doi` varchar(255) DEFAULT NULL,
  `userId` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `doi` (`doi`),
  KEY `userId` (`userId`),
  CONSTRAINT `publications_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `publications` VALUES 
('1c61fa26-590a-48e1-8ef6-f9706af7dcb7','Test Publication','["Tarek Zaafrane","Tarek"]','Journal Lab-tim',2025,'47','548','14-89','f4e9806b-a3b7-46e8-bbe0-e45cb6b0852d','2025-07-16 14:03:06','2025-08-25 10:56:04');


-- Table: theses
CREATE TABLE `theses` (
  `id` char(36) NOT NULL,
  `title` varchar(255) NOT NULL,
  `author` varchar(255) NOT NULL,
  `year` int NOT NULL,
  `summary` text NOT NULL,
  `type` enum('HDR','These') NOT NULL,
  `etablissement` varchar(255) NOT NULL,
  `specialite` varchar(255) NOT NULL,
  `encadrant` varchar(255) NOT NULL,
  `membres` text,
  `userId` char(36) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `theses_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `theses` VALUES 
('3969acd3-1ed2-4393-9a5c-09a8d0bc33be','HDR Tarek','Tarek Zaafrane',2025,'Thèse Tarek','HDR','FMM','FMMM','Tarek','["Jury1","Jury2"]','4f1b778b-7c36-4a41-9860-8c16a3ffe4b3','2025-07-08 12:49:26','2025-08-25 10:56:43'),
('f976d673-331f-4c02-8a59-4d08f260d79f','These Tarek','Tarek',2025,'Résumé these','HDR','FMM','FMMM','Tarek','["Tarek"]','f4e9806b-a3b7-46e8-bbe0-e45cb6b0852d','2025-07-02 14:15:23','2025-08-25 10:56:57');
