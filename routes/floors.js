import express from "express";
import {
  changePwd,
  forgotPassword,
  resetPassword,
} from "../controllers/Authentication";
import { verifyToken } from "../middleware";
import { addNewFloor } from "../controllers/Floors/addNewFloor";
import { getAllFloors } from "../controllers/Floors";

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
 *       properties:
 *         Name:
 *           type: string
 *           description: The name of the floor
 *       example:
 *         Name: "Ground"
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
 * /parking/floor/getFloors/{id}:
 *   get:
 *     summary: Returns floors of the buildings
 *     tags: [clientAccess]
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The building id
 *     responses:
 *       200:
 *          description: The buildings found successfully
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

floor.get("/getFloors/:id", getAllFloors);

export default floor;
