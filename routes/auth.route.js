import express from "express";
import {
  changePwd,
  forgotPassword,
  logIn,
  resetPassword,
} from "../controllers";

const authRoute = express.Router();

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Log into user account
 *     tags: [Authentication]
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/login'
 *     responses:
 *       200:
 *          description: The user was successfully authorised
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       403:
 *          description: Wrong email or password
 *       500:
 *          description: Internal Server Error
 */

authRoute.post("/login", logIn);

authRoute.patch("/changepassword", changePwd);

authRoute.post("/forgotpassword", forgotPassword);

authRoute.patch("/resetpassword", resetPassword);

export default authRoute;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     login:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         email: email@example.com
 *         password: myPassword!
 *
 */

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: The user authentication managing API
 */
