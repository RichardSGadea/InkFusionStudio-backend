import express, {Request, Response} from "express";

const router = express.Router();

//Users routes
router.get("/profile", (req: Request, res: Response) => {
    res.send("get user profile") 
})

router.put("/profile", (req: Request, res: Response) => {
    res.send("Modified user profile") 
})

router.get("/workers", (req: Request, res: Response) => {
    res.send("Get all workers") 
})

export default router;




