import express from 'express';
import { index, show, create } from '../../Handlers/userHandler';
import verifyAuthToken from '../../Middleware/verifyToken';

const users = express.Router();

users.get('/', verifyAuthToken, index);

users.get('/id', verifyAuthToken, show);

users.post('createuser', create)

export default users;
