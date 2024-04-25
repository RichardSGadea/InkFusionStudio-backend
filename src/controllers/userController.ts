import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { UserRoles } from "../constants/UserRoles";

export const userController = {
    async getProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId);

            const user = await User.findOne({
                relations: {
                    role: true,
                },
                where: {
                    id: userId
                },
            });

            if (!user) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.json(user);
        } catch (error) {
            res.status(500).json({
                message: "Failed to get user profile"
            })
        }
    },

    async updateProfile(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId);

            const { password, role, ...resUserData } = req.body

            const userToUpdate = await User.findOne({
                where: { id: userId },
            })

            if (password) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                userToUpdate!.password = hashedPassword
            }

            const updatedUser: Partial<User> = {
                ...userToUpdate,
                ...resUserData,
            };

            await User.save(updatedUser);

            res.status(202).json({
                message: "User profile updated successfully"
            })

        } catch (error) {
            res.status(500).json({
                message: "Failed to update user profile"
            })
        }
    },

    async getWorkers(req: Request, res: Response): Promise<void> {
        try {

            const page = Number(req.query.page) || 1;

            const limit = Number(req.query.limit) || 10;

            const [workers, totalWorkers] = await User.findAndCount({

                select: {
                    id: true,
                    firstName: true,
                    email: true,
                },
                where: {
                    role: UserRoles.WORKER
                },
                skip: (page - 1) * limit,
                take: limit
            });

            if (totalWorkers === 0) {
                res.status(404).json({ message: "Workers not found" });
                return;
            }

            const totalPages = Math.ceil(totalWorkers / limit);

            res.status(200).json({
                workers: workers,
                current_page: page,
                per_page: limit,
                total_pages: totalPages,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve workers",
            });
        }
    },

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;

            const limit = Number(req.query.limit) || 10;

            const [clients, totalClients] = await User.findAndCount({

                select: {
                    id: true,
                    firstName: true,
                    email: true,
                    isActive: true,
                },
                where: {
                    role: UserRoles.CLIENT
                },
                skip: (page - 1) * limit,
                take: limit
            });

            if (totalClients === 0) {
                res.status(404).json({ message: "Workers not found" });
                return;
            }

            const totalPages = Math.ceil(totalClients / limit);

            res.status(200).json({
                clients: clients,
                current_page: page,
                per_page: limit,
                total_pages: totalPages,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve users",
            });
        }
    },

    async getAllWorkers(req: Request, res: Response): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;

            const limit = Number(req.query.limit) || 10;

            const [workers, totalWorkers] = await User.findAndCount({

                select: {
                    id: true,
                    firstName: true,
                    email: true,
                    isActive: true,
                },
                where: {
                    role: UserRoles.WORKER
                },
                skip: (page - 1) * limit,
                take: limit
            });

            if (totalWorkers === 0) {
                res.status(404).json({ message: "Workers not found" });
                return;
            }

            const totalPages = Math.ceil(totalWorkers / limit);

            res.status(200).json({
                workers: workers,
                current_page: page,
                per_page: limit,
                total_pages: totalPages,
            });
        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve users",
            });
        }
    },

    async getUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);

            const userToShow = await User.findOne({
                where: { id: userId },
            })

            if (!userToShow) {
                res.status(404).json({ message: "User not found" });
                return;
            }

            res.json(userToShow);
        } catch (error) {
            res.status(500).json({
                message: "Failed to get user profile"
            })
        }
    },

    async updateUserById(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.params.id);

            const { password, role, ...resUserData } = req.body

            const userToUpdate = await User.findOne({
                where: { id: userId },
            })

            if (password) {
                const hashedPassword = bcrypt.hashSync(password, 10);
                userToUpdate!.password = hashedPassword
            }

            const updatedUser: Partial<User> = {
                ...userToUpdate,
                ...resUserData,
            };

            await User.save(updatedUser);

            res.status(202).json({
                message: "User profile updated successfully"
            })

        } catch (error) {
            res.status(500).json({
                message: "Failed to get user profile"
            })
        }
    },
}