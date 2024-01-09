import express from "express";
const notificationRouter = express.Router();

import { admin, verifyToken } from "../middleware";
import { getNotifications } from "../controllers/Notification";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Notification:
 *       properties:
 *         user:
 *           type: string
 *           description: The name of the user
 *         type:
 *           type: string
 *           description: The type of notification
 *         actionMade:
 *           type: string
 *           description: The action made
 *       example:
 *         user: "user names"
 *         type: "signup"
 *         actionMade: "User registered"
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: The notification managing API
 */

/**
 * @swagger
 * /parking/notification/getNotifications:
 *   get:
 *     summary: Returns notifications
 *     tags: [Notifications]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Notification'
 *       204:
 *          description: No content found.
 *       500:
 *          description: Internal Server Error
 */

notificationRouter.get(
  "/getNotifications",
  verifyToken,
  admin,
  getNotifications
);

export default notificationRouter;
