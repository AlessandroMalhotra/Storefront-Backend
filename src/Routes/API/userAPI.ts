import express from 'express';
import { index, show, create } from '../../Handlers/userHandler';

const users = express.Router();

users.get('/', index);

users.get('/id', show);

users.post('createuser', create)

export default users;
