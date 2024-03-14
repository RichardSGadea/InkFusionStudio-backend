//define how to initialize the application`

import express,{ Application } from "express";
import cors from "cors";
import { corsOptions } from "./cors";
import apiRoutes from "../routes/api.routes"

const app:Application= express();

app.use(express.json());
app.use(cors(corsOptions));

//Register API routes
app.use("/api", apiRoutes);

export default app;