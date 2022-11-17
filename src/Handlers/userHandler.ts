import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt from 'jsonwebtoken';
import { UserAccounts, User } from '../Models/user';

const SECRET = process.env.SECRET as string;
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
    username: req.body.username,
    password: req.body.password
  }
  try {
    const newUser = await userAccount.create(user);
    let token = jwt.sign({user:newUser}, SECRET);
    
    res.json(token);
  } catch (error) {
    // throw error here with status code need to look into it. 
  }
};

export { index, show };
