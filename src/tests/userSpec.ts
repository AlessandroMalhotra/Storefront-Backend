import { UserAccounts } from '../Models/user'

const user = new UserAccounts();

describe("Test user model functions", () => {

  it("GET all users in the database", async () => {
    expect(user.index).toBeDefined();
  });

  it ("GET should return a list of users", async () => {
    const users = await user.index();
    expect(users).toEqual([]);
  });
});