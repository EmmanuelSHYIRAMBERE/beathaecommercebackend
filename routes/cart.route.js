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
 *         productId:
 *           type: string
 *           description: Product id
 *         count:
 *           type: number
 *           description: Count of product
 */
/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: Operations related to the shopping cart
 */
