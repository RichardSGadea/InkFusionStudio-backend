import { Request, Response } from "express";


export const userController = {

    async create(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            res.status(500).json({
                message: "Failed to create appointment"
            })
        }
    },

    async modify(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            res.status(500).json({
                message: "Failed to modify appointment"
            })
        }
    },

    async delete(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            res.status(500).json({
                message: "Failed to delete appointment"
            })
        }
    },

    async getOfClient(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve appointments"
            })
        }
    },

    async getOfWorker(req: Request, res: Response): Promise<void> {
        try {

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve appointments"
            })
        }
    },


}