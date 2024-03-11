import express from "express";

const router = express.Router();

//Authentication routes
router.post('/login',(req, res) => {
    res.send("Initialize");
})
router.post('/register',(req, res) => {
    res.send("post new user");
})

export default router;