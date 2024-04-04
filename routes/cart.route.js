import express from "express";
import { createCart } from "../controllers/cart.controller";
import { verifyToken } from "../middleware/tokenVerification";

const cartRouter = express.Router();

cartRouter.post("/", verifyToken, createCart);

export default cartRouter;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               productId:
 *                 type: string
 *                 description: Product ID
 *               count:
 *                 type: number
 *                 description: Count of the product
 *                 default: 1
 */

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 */

/**
 * @swagger
 * /api/v1/cart:
 *   post:
 *     summary: Add products to the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       description: Cart data to create
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       '201':
 *         description: Cart created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       '400':
 *         description: Bad request. Invalid product ID or count, or user not found
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token
 *       '404':
 *         description: Product not found
 *       '500':
 *         description: Internal server error. Please try again later
 */
