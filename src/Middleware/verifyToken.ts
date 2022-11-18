import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = process.env.SECRET as string;

const verifyAuthToken = async(req: express.Request, res: express.Response, next: NextFunction): Promise<void> => {
    try {
        const authorizationHeader = req.headers.authorization;
        const token = authorizationHeader?.split('')[1] as string;
        const decoded = jwt.verify(token, SECRET);

        next();
    } catch (error) {
        res.status(401);
    }
}

export default verifyAuthToken;