import express from 'express';
import { UserAccounts } from '../../Models/user';

const user = express.Router();
const userAccount = new UserAccounts();

user.get('/users', async (req: express.Request, res: express.Response) => {
    try {
        const users = await userAccount.index();
        res.send(users);
    } catch (error) {
        res.send(`Cannot get users due to ${error}.`);
    }
})

export default user;