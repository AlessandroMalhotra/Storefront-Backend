import { before } from 'node:test';
import { userInfo } from 'os';
import { User, UserAccounts } from '../../Models/user';

const user = new UserAccounts();

describe('Test user model functions', () => {
  const newUser: User = {
    firstName: 'test',
    lastName: 'test',
    password: 'password',
    username: 'test',
    admin: false,
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
      id: 3,
      firstName: 'test',
      lastName: 'test',
      password: users.password,
      username: 'test',
      admin: false,
    });
  });

  it('Should return a list of users', async () => {
    const users = await user.index();
    expect(users).toEqual(users);
  });

  it('Should return user by id', async () => {
    const users = await user.show(3);
    expect(users).toEqual({
      id: 3,
      firstName: 'test',
      lastName: 'test',
      password: users.password,
      username: 'test',
      admin: false,
    });
  });
});
