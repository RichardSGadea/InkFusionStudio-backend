import express, {Request, Response} from "express";

const router = express.Router();

//Appointments routes

router.post("/create", (req: Request, res: Response) => {
    res.send("Created appointment") 
})

router.put("/:id", (req: Request, res: Response) => {
    res.send("Modified appointment by id") 
})

router.delete("/:id", (req: Request, res: Response) => {
    res.send("Deleted appointment by id") 
})

//route only clients
router.get("/client/:id", (req: Request, res: Response) => {
    res.send("get user appointments") 
})

//route only workers
router.get("/worker/:id", (req: Request, res: Response) => {
    res.send("get worker appointments") 
})

export default router;