import express, {Request, Response} from "express";
import { auth } from "../middlewares/auth";
import { appointmentController } from "../controllers/appointmentController";

const router = express.Router();

//Appointments routes

router.post("/", auth, appointmentController.create)

router.put("/:id",auth, appointmentController.update)

router.delete("/:id", auth, appointmentController.delete)

//route only clients
router.get("/client", auth, appointmentController.getCalendarClient)

//route only workers
router.get("/worker", auth,appointmentController.getCalendarWorker)

export default router;