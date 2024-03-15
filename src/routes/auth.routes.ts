import express from "express";
import { authController } from "../controllers/authController";

const router = express.Router();

//Authentication routes
router.post('/login',(req, res) => {
    res.send("Initialize");
})
router.post('/register',authController.register)

export default router;