import express from "express";
import userRoutes from "./users.routes"
import appointmentRoutes from "./appointments.routes";
import authRoutes from "./auth.routes";

const router = express.Router();

//API routes
router.use('/users', userRoutes);
router.use('/appointments', appointmentRoutes);
router.use('/auth', authRoutes);



export default router;