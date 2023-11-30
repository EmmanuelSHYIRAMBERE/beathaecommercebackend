import express from "express";
import {
  changePwd,
  forgotPassword,
  resetPassword,
} from "../controllers/Authentication";
import { verifyToken } from "../middleware";

const authenticate = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     changePassword:
 *       type: object
 *       required:
 *         - existingPassword
 *         - newPassword
 *       properties:
 *         existingPassword:
 *           type: string
 *           description: The current password of the user
 *         newPassword:
 *           type: string
 *           description: A new password of the user
 *       example:
 *         existingPassword: 1234@2Password
 *         newPassword: 1234@!myPassword
 *     forgotPassord:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *       example:
 *         email: email@example.com
 *     resetPassword:
 *       type: object
 *       required:
 *         - password
 *         - passwordConfirm
 *       properties:
 *         password:
 *           type: string
 *           description: The new password of the user
 *         passwordConfirm:
 *           type: string
 *           description: The confirmation password of the user
 *       example:
 *         password: 1234@!myNewPassword
 *         passwordConfirm: 1234@!myNewPassword
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The user authentication managing API
 */

/**
 * @swagger
 * /parking/password/changepassword:
 *   patch:
 *     summary: Change current password
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/changePassword'
 *     responses:
 *       201:
 *          description: The new password was successfully changed
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/changePassword'
 *       401:
 *          description: wrong email or password credentials!
 *       404:
 *          description: User not found
 *       500:
 *          description: Internal Server Error
 */

authenticate.patch("/changepassword", verifyToken, changePwd);

export default authenticate;
