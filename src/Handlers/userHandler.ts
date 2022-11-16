import express from 'express';
import { UserAccounts } from '../Models/user';

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
  const userId = Number(req.params.id);
  console.log(userId);

  try {
    const user = await userAccount.show(userId);

    res.send(user);
  } catch (error) {
    res.send(`Cannot get user by id ${userId}, ${error}.`);
  }
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
  //
};

export { index, show };
