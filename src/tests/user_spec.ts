import { userStory } from "../models/user";
const store = new userStory();
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
  it("delete should be not be undefined ", async () => {

    expect(store.delete).toBeDefined();
  });
  it("update should be not be undefined ", async () => {
    expect(store.update).toBeDefined();
  });
  it("authenticate should be not be undefined ", async () => {
    expect(store.authenticate).toBeDefined();
  });
});
