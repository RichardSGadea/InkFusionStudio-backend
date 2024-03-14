import { Request, Response } from "express";


export const userController = {
    async getProfile(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve user profile"
            })
        }
    },

    async modifiedProfile(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            res.status(500).json({
                message: "Failed to updated user profile"
            })
        }
    },

    async getWorkers(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve workers"
            })
        }
    },
}