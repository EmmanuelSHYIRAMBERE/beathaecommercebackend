import express from "express";
import {
  createBilling,
  getAllBilling,
  viewOneBilling,
  updateBilling,
  deleteBilling,
} from "../controllers";

const billingRoute = express.Router();

billingRoute.post("/", createBilling);
billingRoute.get("/", getAllBilling);
billingRoute.get("/:id", viewOneBilling);
billingRoute.put("/:id", updateBilling);
billingRoute.delete("/:id", deleteBilling);

export default billingRoute;

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     billing:
 *       type: object
 *       required:
 *         - email
 *         - country
 *         - town
 *         - street
 *         - state
 *         - postcode
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user
 *         country:
 *           type: string
 *           description: The country of the billing
 *         town:
 *           type: string
 *           description: The town of the billing
 *         street:
 *           type: string
 *           description: The street of the billing
 *         state:
 *           type: string
 *           description: The state of the billing
 *         postcode:
 *           type: string
 *           description: The postcode of the billing
 *       example:
 *         email: email@example.com
 *         country: Country
 *         town: Town
 *         street: Street
 *         state: State
 *         postcode: 12345
 *
 */

/**
 * @swagger
 * tags:
 *   name: Billing
 *   description: API endpoints for managing billing information
 */

/**
 * @swagger
 * /api/v1/billing:
 *   post:
 *     summary: Create a new billing entry
 *     tags: [Billing]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/billing'
 *     responses:
 *       201:
 *         description: Billing created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/billing'
 *       400:
 *         description: Bad request, check input data
 *       500:
 *         description: Internal Server Error
 *
 *   get:
 *     summary: Get all billings
 *     tags: [Billing]
 *     responses:
 *       200:
 *         description: List of all billings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/billing'
 *       500:
 *         description: Internal Server Error
 *
 * /api/v1/billing/{id}:
 *   get:
 *     summary: Get a billing entry by ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the billing entry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A single billing entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/billing'
 *       404:
 *         description: Billing not found
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     summary: Update a billing entry by ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the billing entry
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/billing'
 *     responses:
 *       200:
 *         description: Updated billing entry
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/billing'
 *       404:
 *         description: Billing not found
 *       500:
 *         description: Internal Server Error
 *
 *   delete:
 *     summary: Delete a billing entry by ID
 *     tags: [Billing]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the billing entry
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Billing deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Success message
 *       404:
 *         description: Billing not found
 *       500:
 *         description: Internal Server Error
 */
