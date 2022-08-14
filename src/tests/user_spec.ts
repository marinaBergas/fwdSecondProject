import { userStory } from "../models/user";
const store = new userStory();
export type User = {
  id?: string;
  username: string;
  password_digest: string;
  email: string;
};
describe("user model", () => {
  it("should have index", () => {
    expect(store.index).toBeDefined();
  });
  it("index should be list ", async () => {
    const result = await store.index();
    expect(result).not.toEqual([]);
  });
  it(" create should not be undefined ", async () => {
    expect(store.create).toBeDefined();
  });
  it('fetch all users', async function () {
    const user: User = {
      "username":"mar",
      "password_digest":"123456",
      "email":"marina.sber@gmail.com"
    }
    await store.create(user)
    const userList = await store.index()

  expect(userList.length).toBeGreaterThan(0);});

  it("delete should be not be undefined ", async () => {

    expect(store.delete).toBeDefined();
  });
  it("delete should return true ", async () => {
    const result=await store.delete("42");
    expect(result).toBe(true);
  });
  it("update should return true ", async () => {
    const user = {
      id:"32",
      username:"mar",
      password_digest:"123456",
      email:"marina.sber@gmail.com"
    }
   const result=await store.update(user);
    expect(result).toBe(true);
  });
  it("authenticate should be not be undefined ", async () => {
    expect(store.authenticate).toBeDefined();
  });
});
