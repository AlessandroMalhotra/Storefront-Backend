import express from 'express';
import { index, show, create, signIn } from '../../Handlers/userHandler';
import verifyAuthToken from '../../Middleware/Authentication/verifyToken';

const users = express.Router();

users.get('/', verifyAuthToken, index);

users.get('/:id', verifyAuthToken, show);

users.post('/createuser', verifyAuthToken, create);

users.post('/signin', signIn);

export default users;
