import express from 'express';
import users from './API/userAPI';

const router = express.Router();

router.use('/users', users);

export default router;
