import express from "express";
import {
  createCustomer,
  addNewCard,
  createCharges,
  makepayment,
} from "../controllers/payment.controller";
import { verifyToken } from "../middleware/tokenVerification";

const paymentRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         card_Name:
 *           type: string
 *           description: Name on the card
 *         card_ExpYear:
 *           type: integer
 *           description: Expiry year of the card
 *           default: 2025
 *         card_ExpMonth:
 *           type: integer
 *           description: Expiry month of the card
 *           default: 12
 *         card_Number:
 *           type: string
 *           description: Card number
 *           default: "4242424242424242"
 *         card_CVC:
 *           type: string
 *           description: Card verification code
 *           default: "123"
 */

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: The user payment managing API
 */

/**
 * @swagger
 * /api/v1/payment:
 *   post:
 *     summary: Make payment
 *     tags: [Payment]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Payment'
 *     responses:
 *       201:
 *          description: The payment made successfully
 *       400:
 *          description: Failed to make payment
 *       500:
 *          description: Internal Server Error
 */
paymentRouter.post("/", verifyToken, makepayment);

export default paymentRouter;
