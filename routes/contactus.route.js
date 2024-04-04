import express from "express";
import {
  createContactUs,
  deleteContactUs,
  getAllContactUs,
  getSingleContactUs,
  modifyContactUs,
} from "../controllers/contactus.controller";

const contactUsRouter = express.Router();

contactUsRouter.post("/", createContactUs);

contactUsRouter.delete("/:id", deleteContactUs);

contactUsRouter.get("/", getAllContactUs);

contactUsRouter.get("/:id", getSingleContactUs);

contactUsRouter.put("/:id", modifyContactUs);

export default contactUsRouter;

/**
 * @swagger
 * tags:
 *   name: Contact Us
 *   description: Operations related to contacting the website
 */

/**
 * @swagger
 * /api/v1/contactus:
 *   post:
 *     summary: Create a new contact request
 *     tags: [Contact Us]
 *     requestBody:
 *       description: Contact request data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Contact request created successfully
 *       '400':
 *         description: Bad request. Missing required fields.
 *       '500':
 *         description: Internal server error. Please try again later.
 *
 *   get:
 *     summary: Get all contact requests
 *     tags: [Contact Us]
 *     responses:
 *       '200':
 *         description: Retrieved all contact requests successfully
 *       '500':
 *         description: Internal server error. Please try again later.
 *
 * /api/v1/contactus/{id}:
 *   get:
 *     summary: Get a single contact request by ID
 *     tags: [Contact Us]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact request
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Retrieved contact request successfully
 *       '404':
 *         description: Contact request not found
 *       '500':
 *         description: Internal server error. Please try again later.
 *
 *   put:
 *     summary: Update a contact request by ID
 *     tags: [Contact Us]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact request
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated contact request data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               message:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Contact request updated successfully
 *       '400':
 *         description: Bad request. Missing required fields.
 *       '404':
 *         description: Contact request not found
 *       '500':
 *         description: Internal server error. Please try again later.
 *
 *   delete:
 *     summary: Delete a contact request by ID
 *     tags: [Contact Us]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact request
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Contact request deleted successfully
 *       '404':
 *         description: Contact request not found
 *       '500':
 *         description: Internal server error. Please try again later.
 */
