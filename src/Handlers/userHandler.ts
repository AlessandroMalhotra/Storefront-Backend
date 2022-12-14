import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import { NotFoundError, BadRequestError } from '../ErrorClasses/UserFacingErrors/userFacingError';
import { UserAccounts, User } from '../Models/user';

const SECRET = process.env.SECRET as Secret;
const userAccount = new UserAccounts();

const index = async (req: express.Request, res: express.Response): Promise<void> => {
  try {
    const user = await userAccount.index();
    if (!user.length) {
      throw new NotFoundError('No users found.');
    }
    res.send(user);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).send(error);
    } else {
      res.status(404).send(error);
    }
  }
};

const show = async (req: express.Request, res: express.Response): Promise<void> => {
  const userId = Number(req.params.id);
  console.log(userId);

  try {
    const user = await userAccount.show(userId);
    if (user === undefined) {
      throw new NotFoundError(`Cannot get user by id ${userId},`);
    }
    res.json(user);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).send(error);
    } else {
      res.status(404).send(error);
    }
  }
};

const create = async (req: express.Request, res: express.Response): Promise<void> => {
  const user: User = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    username: req.body.username,
    password: req.body.password,
  };
  try {
    const newUser = await userAccount.create(user);
    let token: string;

    if (newUser.username === 'admin') {
      token = jwt.sign({ username: newUser.username, password: newUser.password, admin: true }, SECRET);
    } else {
      token = jwt.sign({ username: newUser.username, password: newUser.password, admin: false }, SECRET);
    }

    res.json(token);
  } catch (error) {
    res.status(400).send(error);
  }
};

const signIn = async (req: express.Request, res: express.Response): Promise<void> => {
  const user: User = {
    username: req.body.username,
    password: req.body.password,
  };
  console.log(user);

  try {
    let token;
    const userPassword = await userAccount.authenticate(user);

    if (userPassword) {
      if (user.username === 'admin') {
        token = jwt.sign({ username: user.username, password: userPassword.password, admin: true }, SECRET);
      } else {
        token = jwt.sign({ username: user.username, password: userPassword.password, admin: false }, SECRET);
      }
    } else {
      throw new NotFoundError('User not found with those credentials please try again.');
    }
    res.json(token);
  } catch (error) {
    if (error instanceof BadRequestError) {
      res.status(400).send(error);
    } else {
      res.status(404).send(error);
    }
  }
};

export { index, show, create, signIn };
