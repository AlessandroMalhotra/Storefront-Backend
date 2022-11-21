import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const SECRET = process.env.SECRET as Secret;

const verifyAuthToken = (req: express.Request, res: express.Response, next: NextFunction): void => {
    try {
        const authorizationHeader = req.headers.authorization as string;
        const token = authorizationHeader.split(' ')[1] as string;
        const decoded = jwt.verify(token, SECRET);
        console.log(decoded);

        next();
    } catch (error) {
        res.send(`${error}`);
    }
}

export default verifyAuthToken;