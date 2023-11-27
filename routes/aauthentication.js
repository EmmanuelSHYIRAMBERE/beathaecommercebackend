import express from "express";
import {
  changePwd,
  forgotPassword,
  resetPassword,
} from "../controllers/Authentication";

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
 *         - password
 *         - newPassword
 *       properties:
 *         password:
 *           type: string
 *           description: The current password of the user
 *         newPassword:
 *           type: string
 *           description: The new password of the user
 *       example:
 *         password: myPassword1@1234
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
 * /parking/password/changepassword/{id}:
 *   patch:
 *     summary: Change current password
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The user id
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

authenticate.patch("/changepassword/:id", changePwd);

/**
 * @swagger
 * /parking/password/forgotpassword:
 *   post:
 *     summary: Forgot password requesting
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/forgotPassord'
 *     responses:
 *       200:
 *          description: Password reset link sent to the user email
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/forgotPassord'
 *       404:
 *          description: User with that email not found
 *       500:
 *          description: Internal Server Error
 */
authenticate.post("/forgotpassword", forgotPassword);

/**
 * @swagger
 * /parking/password/resetpassword/{token}:
 *   patch:
 *     summary: Create a new password
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: token
 *          schema:
 *             type: string
 *          required: true
 *          description: The reset password token sent to the user email
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/resetPassword'
 *     responses:
 *       201:
 *          description: The new password was successfully changed
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/resetPassword'
 *       401:
 *          description: Token is invalid or has expired || Password and confirm password does not match!
 *       500:
 *          description: Internal Server Error
 */
authenticate.patch("/resetpassword/:token", resetPassword);

export default authenticate;
