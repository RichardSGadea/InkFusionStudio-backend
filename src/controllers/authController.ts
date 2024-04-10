import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/User";
import { UserRoles } from "../constants/UserRoles";
import jwt from "jsonwebtoken"

export const authController = {

    async register(req: Request, res: Response): Promise<void> {
        try {
            const { firstName, email, password } = req.body;

            if (!firstName || !email || !password) {
                res.status(400).json({
                    message: "All fields must be provided"
                })
                return;
            }

            const users = await User.find();
            for (let element of users) {
                if (element.email === email) {
                    res.status(400).json({
                        message: "Email is already in use",
                    });
                    return;
                }
            };

            const hashedPassword = bcrypt.hashSync(password, 10);

            const userToCreate = User.create({
                firstName: firstName,
                email: email,
                password: hashedPassword,
                role: UserRoles.CLIENT
            });

            await User.save(userToCreate);

            res.status(201).json({
                message: "User has been created"
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to register user",


            })
        }

    },

    async login(req: Request, res: Response): Promise<void> {

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({
                    message: "All fields must be provided"
                })
                return;
            }

            const user = await User.findOne({
                relations: {
                    role: true
                },
                where: {
                    email: email,
                },
                select: {
                    id: true,
                    password: true,
                    email: true,
                }
            })

            if (!user) {
                res.status(400).json({
                    message: "Bad credentials"
                })
                return;
            }

            const isPasswordCorrect = bcrypt.compareSync(password, user.password);

            if (!isPasswordCorrect) {
                res.status(400).json({
                    message: "Bad credentials"
                })
                return;
            }

            const tokenPayload = {
                userId: user.id,
                userRole: user.role.name,
                userEmail: user.email
            }

            // Generate token
            const token = jwt.sign(
                tokenPayload,
                process.env.JWT_SECRET as string,
                {
                    expiresIn: "3h"
                }
            );

            res.status(200).json({
                message:"Login successfully",
                token,
            })

        } catch (error) {
            res.status(500).json({
                message: "Failed to login user",
            })
        }


    },

}