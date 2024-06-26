import express from "express";
import {
  getAllUser,
  getSingleUser,
  signUp,
  deleteUser,
  modifyUser,
  getAllCustomers,
} from "../controllers";

const usersRouter = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     signUp:
 *       type: object
 *       required:
 *         - fullNames
 *         - email
 *         - username
 *         - phoneNo
 *         - location
 *         - password
 *       properties:
 *         fullNames:
 *           type: string
 *           description: The fullNames of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         username:
 *           type: string
 *           description: The username of the user
 *         phoneNo:
 *           type: string
 *           description: The phoneNo of the user
 *         location:
 *           type: string
 *           description: The address of the user
 *         password:
 *           type: string
 *           description: The password of the user
 *       example:
 *         fullNames: full names
 *         email: email@example.com
 *         username: username
 *         phoneNo: "+25070000000"
 *         location: myAddress
 *         password: myPassword1
 *     userUpdate:
 *       type: object
 *       properties:
 *         fullNames:
 *           type: string
 *           description: The updated full names of the user
 *         username:
 *           type: string
 *           description: The updated username of the user
 *         profilePicture:
 *           type: string
 *           format: binary
 *           description: The updated profile picture file of the user (upload from local user files)
 *         phoneNo:
 *           type: string
 *           description: The updated phone number of the user
 *         location:
 *           type: string
 *           description: The updated address of the user
 *       example:
 *         fullNames: full names
 *         email: email@example.com
 *         username: username
 *         profilePicture: picture.jpg
 *         phoneNo: "+25070000000"
 *         location: myAddress
 *         password: myPassword1
 *
 */

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: The user authorization managing API
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success. Returns an array of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/signUp'
 *       404:
 *         description: No users found.
 *       500:
 *         description: Internal Server Error.
 */

usersRouter.get("/", getAllUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to fetch
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success. Returns the user object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/signUp'
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */

usersRouter.get("/:id", getSingleUser);

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *     responses:
 *       201:
 *          description: The user was successfully created
 *          content:
 *             application/json:
 *               schema:
 *                   $ref: '#/components/schemas/signUp'
 *       409:
 *          description: Data conflict
 *       500:
 *          description: Internal Server Error
 */

usersRouter.post("/", signUp);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *          description: The user was successfully deleted
 *          content:
 *             application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: The deletion success message
 *       404:
 *          description: User not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.delete("/:id", deleteUser);

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *          required: true
 *          content:
 *            application/json:
 *               schema:
 *                   $ref: '#/components/schemas/userUpdate'
 *     responses:
 *       200:
 *          description: The user was successfully updated
 *          content:
 *             application/json:
 *               schema:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       description: The update success message
 *                     modifiedUser:
 *                       $ref: '#/components/schemas/signUp'
 *       404:
 *          description: User not found
 *       500:
 *          description: Internal Server Error
 */

usersRouter.put("/:id", modifyUser);

usersRouter.get("/customers", getAllCustomers);

export default usersRouter;
