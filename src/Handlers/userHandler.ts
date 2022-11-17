import express from 'express';
import { UserAccounts, User } from '../Models/user';

const userAccount = new UserAccounts();

const index = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const user = await userAccount.index();
    res.send(user);
  } catch (error) {
    res.send(`Cannot get users due to ${error}.`);
  }
};

const show = async (req: express.Request, res: express.Response): Promise<void> => {
  const userId = Number(req.body.id);
  console.log(userId);

  try {
    const user = await userAccount.show(userId);

    res.json(user);
  } catch (error) {
    res.send(`Cannot get user by id ${userId}, ${error}.`);
  }
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    username: req.body.username
  }
};

export { index, show };
