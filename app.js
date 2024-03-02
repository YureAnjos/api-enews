import express from "express";
import router from "./src/routes/index.js";
import { connectDatabase } from "./src/database/db.js";

const app = express();

connectDatabase();
app.use(express.json());
app.use(router);

export default app;
