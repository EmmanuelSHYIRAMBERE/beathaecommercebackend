import express from "express";

const bookingsRouter = express.Router();

import {
  bookParkingSpot,
  getBookings,
  deleteBooking,
  updateBooking,
  getBooking,
  modifyBooking,
  getCheckOutSession,
} from "../controllers/Bookings";
import { admin, paginatedResults, verifyToken } from "../middleware";
import { Booking } from "../models";

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     reservations:
 *       type: object
 *       required:
 *         - parkingID
 *         - userID
 *         - plateNo
 *         - paymentMethod
 *       properties:
 *         parkingID:
 *           type: string
 *           description: The id of the parking spot
 *         userID:
 *           type: string
 *           description: The id of the user
 *         plateNo:
 *           type: string
 *           format: binary
 *           description: The plate number of a car
 *         paymentMethod:
 *           type: string
 *           description: The favourable payment method for the user
 *       example:
 *         parkingID: "P-12345"
 *         userID: "U-56789"
 *         plateNo: "ABC-123"
 *         paymentMethod: "Credit Card"
 */

/**
 * @swagger
 * tags:
 *   name: Resevations
 *   description: The reservations managing API
 */

/**
 * @swagger
 * /parking/reservations/bookParking/:
 *   post:
 *     summary: Reserve one of the available parking slot
 *     tags: [Resevations]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/reservations'
 *     responses:
 *       200:
 *          description: The parking slot reserved successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/reservations'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.post("/bookParking", verifyToken, bookParkingSpot);

/**
 * @swagger
 * /parking/reservations/getreservations:
 *   get:
 *     summary: Returns the list of all the reserved parking slot
 *     tags: [Resevations]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: Success
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/reservations'
 *       403:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

bookingsRouter.get("/getreservations", verifyToken, getBookings);

bookingsRouter.get("/getbooking/:id", getBooking);

bookingsRouter.delete("/deletebooking/:id", deleteBooking);

bookingsRouter.put("/updatebooking/:id", updateBooking);

bookingsRouter.patch("/modifybooking/:id", modifyBooking);

bookingsRouter.get("/checkout/:id", getCheckOutSession);

export default bookingsRouter;
