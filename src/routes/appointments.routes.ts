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

router.get("/client/:id", auth, appointmentController.getAppointmentById)
 
//route only workers
router.get("/worker", auth,appointmentController.getCalendarWorker)


//Routes protected
router.get("/general", auth, authorize(["admin"]),appointmentController.getAllCalendar)
router.delete("/general/:id", auth, authorize(["admin"]),appointmentController.deleteAppointmentById)
router.put("/general/:id",auth,authorize(["admin"]), appointmentController.updateAppointmentById)


export default router;