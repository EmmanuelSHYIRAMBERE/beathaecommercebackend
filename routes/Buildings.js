import express from "express";
import { addNewBuilding } from "../controllers/Building/addNewBuilding";
import { admin, verifyToken } from "../middleware";
import { deleteBuilding } from "../controllers/Building/deleteBuilding";
import { getAllBuildings } from "../controllers/Building/getAllBuildings";
import { updateBuilding } from "../controllers/Building/updateBuilding";
const buildingRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Buildings:
 *       type: object
 *       required:
 *         - buildingName
 *         - Address
 *         - managerEmail
 *       properties:
 *         buildingName:
 *           type: string
 *           description: The name of the building containing parkings
 *         Address:
 *           type: string
 *           description: The location of the building
 *         managerEmail:
 *           type: string
 *           description: The manager's email
 *       example:
 *         buildingName: "BuildingName"
 *         Address: "Kn 121 st 344"
 *         managerEmail: "email@example.com"
 *     updateBuildings:
 *       type: object
 *       properties:
 *         buildingName:
 *           type: string
 *           description: The name of the building containing parkings
 *         Address:
 *           type: string
 *           description: The location of the building
 *         managerEmail:
 *           type: string
 *           description: The manager's email
 *       example:
 *         buildingName: ""
 *         Address: ""
 *         managerEmail: ""
 */

/**
 * @swagger
 * tags:
 *   name: Buildings
 *   description: The buildings managing API
 */

/**
 * @swagger
 * /parking/buildings/getAllBuildingData:
 *   get:
 *     summary: Returns the details of all the buildings
 *     tags: [Buildings]
 *     security:
 *       - BearerAuth: []
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

buildingRouter.get("/getAllBuildingData", verifyToken, admin, getAllBuildings);

/**
 * @swagger
 * /parking/buildings/addNewBuilding:
 *   post:
 *     summary: Create a new building data
 *     tags: [Buildings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Buildings'
 *     responses:
 *       201:
 *          description: The new building data was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Buildings'
 *       409:
 *          description: A user already exists
 *       500:
 *          description: Internal Server Error
 */

buildingRouter.post("/addNewBuilding", verifyToken, admin, addNewBuilding);

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

// buildingRouter.get("/getOneParking/:id", getOneParking);

/**
 * @swagger
 * /parking/buildings/deleteBuilding/{id}:
 *   delete:
 *     summary: Delete the building data by id
 *     tags: [Buildings]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The building id
 *     responses:
 *       200:
 *          description: A building deleted successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/Buildings'
 *       401:
 *          description: A user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

buildingRouter.delete(
  "/deleteBuilding/:id",
  verifyToken,
  admin,
  deleteBuilding
);

/**
 * @swagger
 * /parking/buildings/updateBuilding/{id}:
 *   put:
 *     summary: Update a building data by id
 *     tags: [Buildings]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/updateBuildings'
 *     parameters:
 *        - in: path
 *          name: id
 *          schema:
 *             type: string
 *          required: true
 *          description: The building id
 *     responses:
 *       200:
 *          description: The building's data modified successfully
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/updateBuildings'
 *       401:
 *          description: The user not authorised
 *       404:
 *          description: Not found
 *       500:
 *          description: Internal Server Error
 */

buildingRouter.put("/updateBuilding/:id", verifyToken, admin, updateBuilding);

export default buildingRouter;
