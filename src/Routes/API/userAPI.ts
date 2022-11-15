import express from 'express';
import { index, show } from '../../Handlers/userHandler';

const users = express.Router();

users.get('/', index);

users.get('/:id', show);

export default users;