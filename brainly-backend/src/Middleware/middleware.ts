import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config";
export function userMiddleware(req: Request, res: Response, next: NextFunction): void {
    const header = req.headers["authorization"];
    try {
        const decodedData = jwt.verify(header as string, JWT_SECRET);
        //@ts-ignore
        req.userId = decodedData.id;
        next();
    } catch (err) {
        res.status(403).json({
            msg: "Invalid or expired token",
        });
    }
}