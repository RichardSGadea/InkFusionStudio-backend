import { Request, Response } from "express";
import { User } from "../models/User";
import { UserRoles } from "../constants/UserRoles";
import { Portfolio } from "../models/Portfolio";
import { Appointment } from "../models/Appointment";
import { AppointmentPortfolio } from "../models/AppointmentPortfolio";



export const appointmentController = {

    async getAppointmentById(req: Request, res: Response): Promise<void> {
        try {

            const appointmentId = Number(req.params.id);

            const appointmentsToShow = await Appointment.findOne({
                where: { id: appointmentId },
                
            })

            if (!appointmentsToShow) {
                res.status(404).json({ message: "Appointment not found" });
                return;
            }

            res.json(appointmentsToShow);

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve appointment info"
            })
        }
    },

    async create(req: Request, res: Response): Promise<void> {
        try {
            const userId = Number(req.tokenData.userId);

            const { appointmentDate, emailWorker, nameJob } = req.body;

            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate() + 1;
            const todayDate = new Date(year, month - 1, day);
            const appointment = new Date(appointmentDate);

            //To validate the format of date and email
            // const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

            const user = await User.findOne({
                where: {
                    id: userId,
                }
            })

            if (!user) {
                res.status(404).json({ message: "Restart Login, invalid token provided" });
                return;
            }


            if (appointment < todayDate) {
                res.status(400).json({
                    message: 'This day is prior to the current day, try again.'
                });
                return;
            }

            if (!appointmentDate || typeof appointmentDate !== "string" /*||!dateRegex.test(appointment_date)*/) {
                res.status(400).json({
                    
                    message: `Remember you must insert a date, and the date format should be YYYY-MM-DD HH-MM, try again`
                });
                return;
            }

            if (typeof emailWorker !== "string" || emailWorker.length > 120 || !emailRegex.test(emailWorker)) {
                res.status(400).json({
                    message: 'Invalid or too long email'
                });
                return;
            }


            //Verify email 

            const foundWorkerByEmail = await User.findOne({
                where: { email: emailWorker, role: UserRoles.WORKER },
            });

            if (!foundWorkerByEmail) {
                res.status(404).json({ message: "Worker not found" });
                return;
            }


            //Verify service

            const getService = await Portfolio.findOne({
                where: { name: nameJob }
            });

            if (!getService) {
                res.status(404).json({ message: "Service not found in Portfolio" });
                return;
            }

            //Verify the non-existence of the appointment


            const existingAppointment = await Appointment.findOne({
                where: {
                    appointmentDate:appointment,
                    workerId: foundWorkerByEmail.id,
                }
            });

            if (existingAppointment) {
                res.status(400).json({
                    message: 'Appointment is not available',
                    
                });
                return;
            }

            const createAppointment = await Appointment.create({
                appointmentDate: appointment,
                workerId: foundWorkerByEmail.id,
                clientId: userId,
            }).save();

            await AppointmentPortfolio.create({
                appointmentId: createAppointment.id,
                portfolioId: getService.id,
            }).save();

            res.status(201).json({
                message: "Appointment has been created",
                user:user
            })

        } catch (error) {
            res.status(500).json({
                message: "Failed to create appointment"
            })
        }
    },

    async update(req: Request, res: Response): Promise<void> {

        try {
            
            const userId = Number(req.tokenData.userId);

            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth() + 1;
            const day = today.getDate() + 1;
            const todayDate = new Date(year, month-1, day);

            const { appointmentDate } = req.body;
            const newDate = new Date(appointmentDate)

            const user = await User.findOne({
                where: {
                    id: userId,
                }
            })

            if (!user) {
                res.status(404).json({ message: "Restart Login, invalid token provided" });
                return;
            }

            const appointmentId = Number(req.params.id)
            
            

            const appointmentToUpdate = await Appointment.findOne({
                where: {
                    id: appointmentId,
                    clientId: userId
                }
            })

            if (!appointmentToUpdate) {
                res.status(404).json({
                    message: "Appointment not found"
                })
                return;
            }

            if (!appointmentDate) {
                res.status(400).json({
                    message: "All fields must be provided",
                });
                return;
            }

            if (newDate < todayDate) {
                res.status(400).json({
                    message: 'This day is prior to the current day, try again.'
                });
                return;
            }
                
            appointmentToUpdate.appointmentDate = newDate;
            appointmentToUpdate.updatedAt = todayDate;
            
            await Appointment.save(appointmentToUpdate)

            res.status(202).json({
                message: "Appointment updated successfully"
            })

        } catch (error) {
            res.status(500).json({
                message: "Failed to update appointment",
            });
        }
    },

    async delete(req: Request, res: Response): Promise<void> {
        try {

            const userId = Number(req.tokenData.userId);

            const user = await User.findOne({
                where: {
                    id: userId,
                }
            })

            if (!user) {
                res.status(404).json({ message: "Restart Login, invalid token provided" });
                return;
            }

            const appointmentId = Number(req.params.id)

            const appointmentToDelete = await Appointment.findOne({
                where: {
                    id: appointmentId,
                    clientId: userId
                }
            })

            if (!appointmentToDelete) {
                res.status(404).json({
                    message: "Appointment not found"
                })
                return;
            }

            const appointmentPortfolios = await AppointmentPortfolio.find({where:{appointmentId:appointmentId}})
            for(let element of appointmentPortfolios){
                await AppointmentPortfolio.delete(element.id);
            }
            
            await Appointment.delete(appointmentId);

            res.status(200).json({ message: "Appointment deleted successfully" });

        } catch (error) {
            res.status(500).json({
                error:error,
                message: "Failed to delete appointment"
            })
        }
    },

    async getCalendarClient(req: Request, res: Response): Promise<void> {
        try {

            const userId = Number(req.tokenData.userId);

            const appointmentsForShows = await Appointment.find({
                relations:{
                    appointmentPortfolios:true
                },
                select:{
                    id:true,
                    appointmentDate:true,
                    workerId:true,
                    appointmentPortfolios:{
                        name:true,
                        price:true,
                    },
                },
                where:{
                    clientId:userId
                },
                order:{
                    appointmentDate:"ASC"
                }
            })

            res.json(appointmentsForShows)

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve appointments"
            })
        }
    },

    async getCalendarWorker(req: Request, res: Response): Promise<void> {
        try {

            const userId = Number(req.tokenData.userId);

            const appointmentsForShows = await Appointment.find({
                relations:{ 
                    appointmentPortfolios:true,
                    client:true
                },
                select:{
                    id:true,
                    appointmentDate:true,
                    clientId:true,
                    client:{
                        firstName:true,
                        email:true,
                    },
                    appointmentPortfolios:{
                        name:true,
                        price:true,
                    },
                },
                where:{
                    workerId:userId
                },
                order:{
                    appointmentDate:"ASC"
                }
            })

            res.json(appointmentsForShows)

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve appointments",
            })
        }
    },

    async getAllCalendar(req: Request, res: Response): Promise<void> {
        try {
            const page = Number(req.query.page) || 1;

            const limit = Number(req.query.limit) || 3;

            const [appointments, totalAppointments] = await Appointment.findAndCount({
                relations:{
                    client:true,
                    worker:true,
                    appointmentPortfolios:true
                },
                select:{
                    id:true,
                    appointmentDate:true,
                    clientId:true,
                    client:{
                        id:true,
                        firstName:true,
                        email:true
                    },
                    workerId:true,
                    worker:{
                        id:true,
                        firstName:true,
                        email:true
                    },
                    appointmentPortfolios:{
                        id:true,
                        name:true,
                        price:true,
                    }
                },
                order:{
                    appointmentDate:"ASC",
                },
                skip: (page - 1) * limit,
                take: limit
            })

            if (totalAppointments === 0) {
                res.status(404).json({ message: "Appointments not found" });
                return;
            }

            const totalPages = Math.ceil(totalAppointments / limit);

            res.status(200).json({
                appointments: appointments,
                current_page: page,
                per_page: limit,
                total_pages: totalPages,
            });

        } catch (error) {
            res.status(500).json({
                message: "Failed to retrieve appointments",
            });
        }
    },

}