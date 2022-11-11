import express from 'express';
import { UserAccounts } from '../../Models/user';

const users = express.Router();
const userAccount = new UserAccounts();

users.get('/', async (req: express.Request, res: express.Response) => {
  try {
    const user = await userAccount.index();
    res.send(user);
  } catch (error) {
    res.send(`Cannot get users due to ${error}.`);
  }
});

users.get('/:id', async (req: express.Request, res: express.Response) => {
  const userId = Number(req.params.id);

  try {
    const user = await userAccount.show(userId);

    res.send(user);
  } catch (error) {
    res.send(`Cannot get user by id ${userId}, ${error}.`);
  }
});

export default users;