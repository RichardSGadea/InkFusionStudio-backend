import { NextFunction, Request, Response } from "express"


export const authorize = (allowedRoles: string[]) => {

    return(req: Request, res: Response, next: NextFunction) => {
        const userRole = req.tokenData.userRole;

        if(allowedRoles.includes(userRole)) {
            return next();
        }

        return res.status(403).json({
            message: "Unauthorized access"
        })
    }


}