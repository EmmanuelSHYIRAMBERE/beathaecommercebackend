import express from "express";

const packRouter = express.Router();

import {
  cashIn,
  cashOut,
  acountTransactions,
  accountEvents,
  accountInfo,
} from "../controllers/payment/paypack";
import { admin, verifyToken } from "../middleware";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     makePayment:
 *       type: object
 *       required:
 *         - number
 *       properties:
 *         number:
 *           type: string
 *           description: The phone number of the user
 *       example:
 *         number: 07xxxxxxxx
 */

/**
 * @swagger
 * /parking/momo/cashin/{id}:
 *   post:
 *     summary: Make payment for the reversed parking spot
 *     tags: [clientAccess]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/makePayment'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The reserved parking spot id
 *     responses:
 *       200:
 *          description: The reserved parking spot is successfully paid
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/makePayment'
 *       404:
 *          description: The requested reserved parking spot not found
 *       500:
 *          description: Internal Server Error
 */

packRouter.post("/cashin/:id", cashIn);

packRouter.get("/cashout", verifyToken, admin, cashOut);

packRouter.get("/transactions", verifyToken, admin, acountTransactions);

packRouter.get("/events", verifyToken, admin, accountEvents);

packRouter.get("/account", verifyToken, admin, accountInfo);

export default packRouter;
