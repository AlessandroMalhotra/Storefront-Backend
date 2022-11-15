import express from 'express';
import { UserAccounts } from '../../Models/user';

const users = express.Router();
const userAccount = new UserAccounts();

users.get('/', async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const user = await userAccount.index();
    res.send(user);
  } catch (error) {
    res.send(`Cannot get users due to ${error}.`);
  }
});

users.get('/:id', async (req: express.Request, res: express.Response): Promise<void> => {
  const userId = Number(req.params.id);
  console.log(userId);

  try {
    const user = await userAccount.show(userId);

    res.send(user);
  } catch (error) {
    res.send(`Cannot get user by id ${userId}, ${error}.`);
  }
});

// const user = (users: express.Router) => {
//   users.get('/', index)
//   users.get('/:id', show);
// }

// users.use(user);

export default users;