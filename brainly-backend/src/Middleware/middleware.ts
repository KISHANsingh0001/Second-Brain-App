import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config";
interface CustomRequest extends Request{
    userId?:string
}
export function userMiddleware(req: CustomRequest, res: Response, next: NextFunction): void {
    const header = req.headers["authorization"];
    try {
        const decodedData = jwt.verify(header as string, JWT_SECRET);
        
        if (typeof decodedData !== 'string') {
            req.userId = decodedData.id;
        }
        next();
    } catch (err) {
        res.status(403).json({
            msg: "Invalid or expired token",
        });
    }
}