import express, {Request, Response} from "express";
import { auth } from "../middlewares/auth";
import { appointmentController } from "../controllers/appointmentController";

const router = express.Router();

//Appointments routes

router.post("/", auth, appointmentController.create)

router.put("/:id",auth, appointmentController.update)

router.delete("/", (req: Request, res: Response) => {
    res.send("Deleted appointment by id") 
})

//route only clients
router.get("/client", (req: Request, res: Response) => {
    res.send("get user appointments") 
})

//route only workers
router.get("/worker", (req: Request, res: Response) => {
    res.send("get worker appointments") 
})

export default router;