import express, {Request, Response} from "express";

const router = express.Router();

//Users routes
router.get("/profile", (req: Request, res: Response) => {
    res.send("get user profile") 
})

router.put("/profile/update", (req: Request, res: Response) => {
    res.send("Modified user profile") 
})

router.get("/workers", (req: Request, res: Response) => {
    res.send("Get all workers") 
})

//route only clients
router.get("/:id/appointment", (req: Request, res: Response) => {
    res.send("get user appointments") 
})

//route only workers
router.get("/:id/appointment", (req: Request, res: Response) => {
    res.send("get worker appointments") 
})




