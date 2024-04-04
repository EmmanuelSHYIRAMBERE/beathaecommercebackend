import express from "express";
import uploaded from "../middleware/multer";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  viewOneProduct,
} from "../controllers";

const productRouter = express.Router();

productRouter.post("/create", uploaded, createProduct);
productRouter.get("/viewAllProd", getAllProduct);
productRouter.get("/viewProd/:id", viewOneProduct);
productRouter.delete("/deleteProduct/:id", deleteProduct);

export default productRouter;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *      Product:
 *       type: object
 *       properties:
 *         productName:
 *           type: string
 *           description: The name of the product.
 *           example: "Example Product"
 *         description:
 *           type: string
 *           description: The description of the product.
 *           example: "This is an example product description."
 *         productImage:
 *           type: array
 *           items:
 *             type: string
 *             format: binary
 *           description: Array of product image URLs.
 *           example: ["https://example.com/image1.jpg"]
 *         price:
 *           type: number
 *           description: The price of the product.
 *           example: 99.99
 *         stock_quantity:
 *           type: number
 *           description: The stock quantity of the product.
 *           example: 9
 *         category:
 *           type: string
 *           description: The category of the product.
 *           example: "Electronic"
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: The product managing API
 */

/**
 * @swagger
 * /api/v1/product/create:
 *   post:
 *     summary: Create a new product
 *     tags: [Product]
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       '201':
 *         description: Successfully created a new product
 *       '404':
 *         description: Failed to save the product
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/product/viewAllProd:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Product
 *     responses:
 *       '200':
 *         description: Successfully retrieved the list of products
 *       '500':
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/v1/product/viewProd/{id}:
 *     get:
 *       summary: View details of a specific product
 *       tags: [Product]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the product to view
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully retrieved the product details
 *         '500':
 *           description: Internal Server Error
 */

/**
 * @swagger
 *
 * paths:
 *   /api/v1/product/deleteProduct/{id}:
 *     delete:
 *       summary: Delete a product by ID
 *       tags: [Product]
 *       parameters:
 *         - in: path
 *           name: id
 *           required: true
 *           description: ID of the product to delete
 *           schema:
 *             type: string
 *       responses:
 *         '200':
 *           description: Successfully deleted the product
 *         '404':
 *           description: Product not found
 *         '500':
 *           description: Internal Server Error
 */
