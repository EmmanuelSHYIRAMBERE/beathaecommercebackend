import express from "express";
import {
  addToCart,
  getAllCarts,
  getCartById,
  updateCart,
  deleteCart,
  clearUserCart,
} from "../controllers/cart.controller";
import { verifyToken } from "../middleware/tokenVerification";

const cartRouter = express.Router();

cartRouter.delete("/clearcart", verifyToken, clearUserCart);

cartRouter.post("/:id", verifyToken, addToCart);

cartRouter.get("/", verifyToken, getAllCarts);

cartRouter.get("/:id", verifyToken, getCartById);

cartRouter.put("/:id", verifyToken, updateCart);

cartRouter.delete("/:id", verifyToken, deleteCart);

export default cartRouter;

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       properties:
 *         quantity:
 *           type: number
 *           description: Quantity of the product
 *           default: 1
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
 *   get:
 *     summary: Get all carts of the user
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully retrieved carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cart'
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token
 *       '500':
 *         description: Internal server error. Please try again later
 *
 * /api/v1/cart/{id}:
 *   get:
 *     summary: Get a specific cart by ID
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token
 *       '404':
 *         description: Cart not found
 *       '500':
 *         description: Internal server error. Please try again later
 *
 *   post:
 *     summary: Add a product to the user's cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
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
 *
 *   put:
 *     summary: Update a cart by ID
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Cart data to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cart'
 *     responses:
 *       '200':
 *         description: Cart updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       '400':
 *         description: Bad request. Invalid cart ID or data
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token
 *       '404':
 *         description: Cart not found
 *       '500':
 *         description: Internal server error. Please try again later
 *
 *   delete:
 *     summary: Delete a cart by ID
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Cart deleted successfully
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token
 *       '404':
 *         description: Cart not found
 *       '500':
 *         description: Internal server error. Please try again later
 *
 * /api/v1/cart/clearcart:
 *   delete:
 *     summary: Clear user cart
 *     tags: [Cart]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       '200':
 *         description: Carts deleted successfully
 *       '401':
 *         description: Unauthorized. Invalid or missing authentication token
 *       '404':
 *         description: Carts not found
 *       '500':
 *         description: Internal server error. Please try again later
 */
