import express from "express";
const parkingRouter = express.Router();

import {
  checkAvailableParkingsByUser,
  addNewParking,
  deleteParkingSlot,
  getOneParking,
  getTotalParking,
  modifyParking,
  updateParking,
} from "../controllers/Parking";
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
 *     parkings:
 *       type: object
 *       required:
 *         - parkingID
 *         - Amount
 *       properties:
 *         parkingID:
 *           type: string
 *           description: The serial number of the parking spot
 *         Amount:
 *           type: string
 *           format: binary
 *           description: The amount for a single hour in the parking spot
 *       example:
 *         parkingID: "P123"
 *         Amount: 500
 */

/**
 * @swagger
 * tags:
 *   name: clientAccess
 *   description: The client accessibility managing API
 */

/**
 * @swagger
 * tags:
 *   name: parkings
 *   description: The parkings managing API
 */

/**
 * @swagger
 * /parking/parkings/checkAvailableParkings:
 *   get:
 *     summary: Returns the list of the total available parking spots
 *     tags: [clientAccess]
 *     responses:
 *       200:
 *          description: The available parking spots found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found.
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/checkAvailableParkings", checkAvailableParkingsByUser);

/**
 * @swagger
 * /parking/parkings/addNewParking:
 *   post:
 *     summary: Create a new parking spot's data
 *     tags: [parkings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *     responses:
 *       201:
 *          description: The new parking spot data was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.post("/addNewParking", verifyToken, addNewParking);

/**
 * @swagger
 * /parking/parkings/getTotalParking:
 *   get:
 *     summary: Returns the list of the total parking spots
 *     tags: [parkings]
 *     responses:
 *       200:
 *          description: The total parking spot successfully found
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found.
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getTotalParking", verifyToken, admin, getTotalParking);

/**
 * @swagger
 * /parking/parkings/getOneParking/{id}:
 *   get:
 *     summary: Get a single parking spot by id
 *     tags: [parkings]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The parking spot id
 *     responses:
 *       200:
 *          description: The parking spot found by id
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getOneParking/:id", getOneParking);

/**
 * @swagger
 * /parking/parkings/deleteParkingSpot/{id}:
 *   delete:
 *     summary: Delete the parking spot's data by id
 *     tags: [parkings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The parking spot id
 *     responses:
 *       200:
 *          description: The parking spot was deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.delete("/deleteParkingSpot/:id", verifyToken, deleteParkingSlot);

/**
 * @swagger
 * /parking/parkings/updateParking/{id}:
 *   put:
 *     summary: Update the parking spot's data by id
 *     tags: [parkings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The parking spot's id
 *     responses:
 *       200:
 *          description: The parking spot's data was modified successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/parkings'
 *       204:
 *          description: No content found
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.put("/updateParking/:id", verifyToken, updateParking);

export default parkingRouter;
