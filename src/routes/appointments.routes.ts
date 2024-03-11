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

