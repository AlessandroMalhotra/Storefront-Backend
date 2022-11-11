import { before } from 'node:test';
import { userInfo } from 'os';
import { User, UserAccounts } from '../Models/user';

const user = new UserAccounts();

describe('Test user model functions', () => {
  const newUser: User = {
    id: 1,
    firstName: 'sandro',
    lastName: 'malhotra',
    password: 'password',
  };

  it('Checks user index function correctly been defined', () => {
    expect(user.index).toBeDefined();
  });

  it('Checks user create function correctly been defined', () => {
    expect(user.create).toBeDefined();
  });

  it('Checks user show function correctly been defined', () => {
    expect(user.show).toBeDefined();
  });

  it('Create a user successfully ', async () => {
    const users = await user.create(newUser);
    expect(users).toEqual({
      id: 1,
      firstName: 'sandro',
      lastName: 'malhotra',
      password: 'password',
    });
  });

  it('Should return a list of users', async () => {
    const users = await user.index();
    expect(users).toEqual([newUser]);
  });

  it('Should return user by id', async () => {
    const users = await user.show(1);
    expect(users).toEqual({
      id: 1,
      firstName: 'sandro',
      lastName: 'malhotra',
      password: 'password',
    });
  });
});
