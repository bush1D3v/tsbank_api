import express from "express";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "../../swagger.json";

const swaggerRoutes = express();

swaggerRoutes.get("/", swaggerUi.setup(swaggerDocument));
swaggerRoutes.use(swaggerUi.serve);

export default swaggerRoutes;
