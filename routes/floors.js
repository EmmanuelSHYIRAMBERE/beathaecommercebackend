import express from "express";
import { verifyToken } from "../middleware";
import {
  addNewFloor,
  deleteFloor,
  getAllFloors,
  getSingleFloor,
  updateFloor,
} from "../controllers/Floors";

const floor = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Floor:
 *       type: object
 *       required:
 *         - Name
 *         - Price
 *       properties:
 *         Name:
 *           type: string
 *           description: The name of the floor
 *         Price:
 *           type: string
 *           description: The price per hour of one slot
 *       example:
 *         Name: "Ground"
 *         Price: 1000
 *     updateFloor:
 *       type: object
 *       properties:
 *         Name:
 *           type: string
 *           description: The name of the floor
 *         Price:
 *           type: string
 *           description: The price per hour of one slot
 *       example:
 *         Name: "Ground"
 *         Price: 1000
 */

/**
 * @swagger
 * tags:
 *   name: Floor
 *   description: The floor managing API
 */

/**
 * @swagger
 * /parking/floor/addnewfloor:
 *   post:
 *     summary: Add a new floor
 *     tags: [Floor]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Floor'
 *     responses:
 *       201:
 *          description: The new floor added successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Floor'
 *       401:
 *          description: Not authorized
 *       500:
 *          description: Internal Server Error
 */

floor.post("/addnewfloor", verifyToken, addNewFloor);

/**
 * @swagger
 * /parking/floor/getFloors:
 *   get:
 *     summary: Returns floors of the buildings
 *     tags: [Floor]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *          description: The floors found successfully
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Buildings'
 *       204:
 *          description: No content found.
 *       500:
 *          description: Internal Server Error
 */

floor.get("/getFloors", verifyToken, getAllFloors);

/**
 * @swagger
 * /parking/floor/getSingleFloor/{id}:
 *   get:
 *     summary: Returns details of a floor
 *     tags: [Floor]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The floor id
 *     responses:
 *       200:
 *          description: The success
 *          content:
 *             application/json:
 *               schema:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Floor'
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

parkingRouter.get("/getSingleFloor/:id", verifyToken, getSingleFloor);

/**
 * @swagger
 * /parking/floor/deletefloor/{id}:
 *   delete:
 *     summary: Delete a  building floor
 *     tags: [Floor]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The floor id
 *     responses:
 *       200:
 *          description: A floor deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Floor'
 *       401:
 *          description: A user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

floor.delete("/deletefloor/:id", verifyToken, deleteFloor);

/**
 * @swagger
 * /parking/floor/updatefloor/{id}:
 *   put:
 *     summary: Update a building floor
 *     tags: [Floor]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The floor id
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Floor'
 *     responses:
 *       200:
 *          description: The floor's data updated successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Floor'
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

floor.put("/updatefloor/:id", verifyToken, updateFloor);

export default floor;
