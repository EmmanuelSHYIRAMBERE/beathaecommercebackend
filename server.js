import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import "dotenv/config";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";

import systemRouter from "./routes";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 7000;

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "BEATHA-ECOMMERCE-Project API Documentation",
      version: "1.0.0",
      description:
        "This BEATHA-ECOMMERCE-Project API Documentation is designed to provide basics of how this API functions.",
    },
    servers: [
      {
        url: "http://localhost:7000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
app.use("/api/v1", systemRouter);
app.use("/uploads", express.static("tour_images"));

mongoose
  .connect(process.env.DB_connect_devs)
  .then((res) => {
    console.log(`DB connected`);
    app.listen(port, () =>
      console.log(
        `BEATHA-ECOMMERCE-Project is running on port http://localhost:${port}`
      )
    );
  })
  .catch((error) => {
    console.log(error);
  });
