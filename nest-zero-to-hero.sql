/*
 Navicat Premium Data Transfer

 Source Server         : i7eo-mysql-docker
 Source Server Type    : MySQL
 Source Server Version : 80100
 Source Host           : localhost:8081
 Source Schema         : nest-zero-to-hero

 Target Server Type    : MySQL
 Target Server Version : 80100
 File Encoding         : 65001

 Date: 01/03/2024 14:44:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for gender
-- ----------------------------
DROP TABLE IF EXISTS `gender`;
CREATE TABLE `gender`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` enum('0','1') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `label` enum('female','male') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of gender
-- ----------------------------
INSERT INTO `gender` VALUES ('81c0c574-b4a8-4b72-ab09-b92ba68ea111', '0', 'male', '2023-10-19 10:49:50.520320', '2023-10-19 10:49:50.636818');
INSERT INTO `gender` VALUES ('bc68c0c9-b2e6-45d2-aa8a-7cc1e7ee19d0', '1', 'female', '2023-10-19 10:49:50.520320', '2023-10-19 10:49:50.636818');

-- ----------------------------
-- Table structure for log
-- ----------------------------
DROP TABLE IF EXISTS `log`;
CREATE TABLE `log`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `method` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `result` int NOT NULL,
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `FK_cea2ed3a494729d4b21edbd2983`(`userId` ASC) USING BTREE,
  CONSTRAINT `FK_cea2ed3a494729d4b21edbd2983` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of log
-- ----------------------------

-- ----------------------------
-- Table structure for profile
-- ----------------------------
DROP TABLE IF EXISTS `profile`;
CREATE TABLE `profile`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `avator` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `genderId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `REL_a24972ebd73b106250713dcddd`(`userId` ASC) USING BTREE,
  UNIQUE INDEX `REL_31ba86a3ae1521c819e9eba08a`(`genderId` ASC) USING BTREE,
  CONSTRAINT `FK_31ba86a3ae1521c819e9eba08a0` FOREIGN KEY (`genderId`) REFERENCES `gender` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_a24972ebd73b106250713dcddd9` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of profile
-- ----------------------------
INSERT INTO `profile` VALUES ('4cb3c446-57bd-481c-83ee-347ba2b6afe4', 'i7eo.avator', 'admin@i7eo.com', 'i7eo.address', 'cd1c2787-51c1-41c2-b4ca-5222bf18b47c', '2024-02-23 06:51:35.511477', '2024-02-23 06:51:35.511477', '81c0c574-b4a8-4b72-ab09-b92ba68ea111');

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `value` enum('0','1','2','3','4','5') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `label` enum('owner','maintainer','developer','reporter','custom','guest') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of role
-- ----------------------------
INSERT INTO `role` VALUES ('060de309-272c-49d8-9057-add087274c0f', '3', 'reporter', '2023-10-19 10:49:07.670554', '2023-10-19 10:49:07.723892');
INSERT INTO `role` VALUES ('22133cb2-49dc-406d-a2a0-000a36137ff8', '0', 'owner', '2023-10-19 10:49:07.670554', '2023-10-19 10:49:07.723892');
INSERT INTO `role` VALUES ('322a53cf-98a0-455b-a407-3bd10c8420f9', '5', 'guest', '2023-10-19 10:49:07.670554', '2023-10-19 10:49:07.723892');
INSERT INTO `role` VALUES ('9444c263-02f5-4bc7-8d42-1ceadd7a13ec', '1', 'maintainer', '2023-10-19 10:49:07.670554', '2023-10-19 10:49:07.723892');
INSERT INTO `role` VALUES ('d7290e46-b840-47fb-9376-af9dfc380455', '4', 'custom', '2023-10-19 10:49:07.670554', '2023-10-19 10:49:07.723892');
INSERT INTO `role` VALUES ('fbec4af1-3716-43c5-a7fd-576aeb17123a', '2', 'developer', '2023-10-19 10:49:07.670554', '2023-10-19 10:49:07.723892');

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `IDX_78a916df40e02a9deb1c4b75ed`(`username` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('cd1c2787-51c1-41c2-b4ca-5222bf18b47c', 'i7eo', '$argon2id$v=19$m=65536,t=3,p=4$Yh011QTOEBZdDKOmkK4WEQ$PrmXC+sOVO6PwJKx9MRL1FeHzsi3n79AX9hVUPBsBLg', '2024-02-23 06:49:22.520562', '2024-02-23 06:49:22.520562');

-- ----------------------------
-- Table structure for users_roles
-- ----------------------------
DROP TABLE IF EXISTS `users_roles`;
CREATE TABLE `users_roles`  (
  `userId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `roleId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  PRIMARY KEY (`userId`, `roleId`) USING BTREE,
  INDEX `IDX_776b7cf9330802e5ef5a8fb18d`(`userId` ASC) USING BTREE,
  INDEX `IDX_4fb14631257670efa14b15a3d8`(`roleId` ASC) USING BTREE,
  CONSTRAINT `FK_4fb14631257670efa14b15a3d86` FOREIGN KEY (`roleId`) REFERENCES `role` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `FK_776b7cf9330802e5ef5a8fb18dc` FOREIGN KEY (`userId`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users_roles
-- ----------------------------
INSERT INTO `users_roles` VALUES ('cd1c2787-51c1-41c2-b4ca-5222bf18b47c', '22133cb2-49dc-406d-a2a0-000a36137ff8');
INSERT INTO `users_roles` VALUES ('cd1c2787-51c1-41c2-b4ca-5222bf18b47c', '9444c263-02f5-4bc7-8d42-1ceadd7a13ec');
INSERT INTO `users_roles` VALUES ('cd1c2787-51c1-41c2-b4ca-5222bf18b47c', 'fbec4af1-3716-43c5-a7fd-576aeb17123a');

SET FOREIGN_KEY_CHECKS = 1;
