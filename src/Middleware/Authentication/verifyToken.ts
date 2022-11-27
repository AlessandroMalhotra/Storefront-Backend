import dotenv from 'dotenv';
dotenv.config();
import express, { NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { AccessDeniedError, UnauthorizedError } from '../../ErrorClasses/UserFacingErrors/userFacingError';

const SECRET = process.env.SECRET as Secret;

const verifyAuthToken = (req: express.Request, res: express.Response, next: NextFunction): void => {
  try {
    const authorizationHeader = req.headers.authorization as string;
    if (!authorizationHeader) {
      throw new UnauthorizedError('Unauthrosied request to resource.');
    }
    const token = authorizationHeader.split(' ')[1] as string;
    if (!token) {
      throw new UnauthorizedError('Unauthrosied request to resource.');
    }
    const decoded = jwt.verify(token, SECRET);

    if (decoded === undefined) {
      throw new AccessDeniedError('User does not have the permissions to access this resource.');
    }

    // check here the admin boolean in payload and decide whether if user can do the request

    next();
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      res.status(401).send(error);
    } else {
      res.status(403).send(error);
    }
  }
};

export default verifyAuthToken;
