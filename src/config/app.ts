//define how to initialize the application`

import express,{ Application } from "express";
import cors from "cors";
import { corsOptions } from "./cors";

const app:Application= express();

app.use(express.json());
app.use(cors(corsOptions));

export default app;