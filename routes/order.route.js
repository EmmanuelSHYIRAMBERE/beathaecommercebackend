import express from "express";
import {
  makeOrder,
  deleteOrder,
  getAllOrder,
  getSingleOrder,
  modifyOrder,
} from "../controllers/order.controller";
import { verifyToken } from "../middleware/tokenVerification";

const orderRouter = express.Router();

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
 *         products:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: Product ID
 *               quantity:
 *                 type: number
 *                 description: Quantity of the product
 *               price:
 *                 type: number
 *                 description: Price of the product
 *         shippingAddress:
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

orderRouter.post("/", verifyToken, makeOrder);
orderRouter.get("/", getAllOrder);

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

orderRouter.get("/:id", getSingleOrder);
orderRouter.put("/:id", modifyOrder);
orderRouter.delete("/:id", deleteOrder);

export default orderRouter;
