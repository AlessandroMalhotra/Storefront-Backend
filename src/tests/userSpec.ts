import { before } from 'node:test';
import { userInfo } from 'os';
import { User, UserAccounts } from '../Models/user';

const user = new UserAccounts();

describe('Test user model functions', () => {

  const newUser: User = {
    id: 1,
    firstName: 'sandro',
    lastName: 'malhotra',
    password: 'password'
  }

  it('Checks index function correctly been defined', () => {
    expect(user.index).toBeDefined();
  });

  it('Checks create function correctly been defined', () => {
    expect(user.create).toBeDefined();
  });

  it('Checks show function correctly been defined', () => {
    expect(user.show).toBeDefined();
  });

  it('Should return a list of users', async () => {
    const users = await user.index();
    expect(users).toEqual([]);
  });

  it('Create a user successfully ', async () => {
    const users = await user.create(newUser);
    expect(users).toEqual([{
      id: 1,
      firstName: 'sandro',
      lastName: 'malhotra',
      password: 'password',
    }]);
  });

  it('Should return user by id', async () => {
    const users = await user.show(1);
    expect(users).toEqual([{
      id: 1,
      firstName: 'sandro',
      lastName: 'malhotra',
      password: 'password',
    }])
  });
});
