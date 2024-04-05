import express from "express";

import { verifyToken } from "../middleware/tokenVerification";
import {
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  makeOrder,
  modifyOrder,
} from "../controllers/order.controller";

const orderRouter = express.Router();

orderRouter.post("/", verifyToken, makeOrder);

orderRouter.get("/", verifyToken, getAllOrders);

orderRouter.get("/:id", verifyToken, getSingleOrder);

orderRouter.put("/:id", verifyToken, modifyOrder);

orderRouter.delete("/:id", verifyToken, deleteOrder);

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: Operations related to orders
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         address:
 *           type: string
 *           description: Shipping address for the order
 *         paymentMethod:
 *           type: string
 *           enum: [Cash on Delivery, Credit Card, Debit Card, Online Banking]
 *           description: Payment method for the order
 */

/**
 * @swagger
 * /api/v1/orders:
 *   post:
 *     summary: Place a new order
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '201':
 *         description: Order placed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '400':
 *         description: Bad request. Missing or invalid data in the request body.
 *       '500':
 *         description: Internal server error. Please try again later.
 *   get:
 *     summary: Get all orders
 *     tags: [Orders]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 *       '500':
 *         description: Internal server error. Please try again later.
 */

/**
 * @swagger
 * /api/v1/orders/{id}:
 *   get:
 *     summary: Get a single order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error. Please try again later.
 *   put:
 *     summary: Modify an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       '200':
 *         description: Order modified successfully
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error. Please try again later.
 *   delete:
 *     summary: Delete an order by ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Order deleted successfully
 *       '404':
 *         description: Order not found
 *       '500':
 *         description: Internal server error. Please try again later.
 */

export default orderRouter;
