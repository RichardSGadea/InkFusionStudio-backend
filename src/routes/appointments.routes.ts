import express, {Request, Response} from "express";
import { auth } from "../middlewares/auth";
import { appointmentController } from "../controllers/appointmentController";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

//Appointments routes

router.post("/", auth, appointmentController.create)

router.put("/:id",auth, appointmentController.update)

router.delete("/:id", auth, appointmentController.delete)

//route only clients
router.get("/client", auth, appointmentController.getCalendarClient)

//route only workers
router.get("/worker", auth,appointmentController.getCalendarWorker)


//Routes protected
router.get("/general", auth, authorize(["admin"]),appointmentController.getAllCalendar)

export default router;