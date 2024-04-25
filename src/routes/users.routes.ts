import express, {Request, Response} from "express";
import { userController } from "../controllers/userController";
import { auth } from "../middlewares/auth";
import { authorize } from "../middlewares/authorize";

const router = express.Router();

//Users routes
router.get("/profile",auth, userController.getProfile)

router.put("/profile", auth, userController.updateProfile)

router.get("/workers", auth, userController.getWorkers)

//Routes protected

router.get("/allUsers", auth, authorize(["admin"]),userController.getAllUsers)
router.get("/allWorkers", auth, authorize(["admin"]),userController.getAllWorkers)
router.get("/:id", auth, authorize(["admin"]),userController.getUserById)
router.put("/:id", auth, authorize(["admin"]),userController.updateUserById)

export default router;




