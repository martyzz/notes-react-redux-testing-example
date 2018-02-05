import reducer from "../reducers/notesReducer";
import { CREATE, UPDATE, REMOVE } from "../types/notesTypes";

describe("notesReducer", () => {
  it("should return initial state", () => {
    const expected = [];
    const result = reducer(undefined, {});
    expect(result).toEqual(expected);
  });

  it("should create new note and add it to the top", () => {
    const initial = [{ id: 1, title: "title1", content: "content1" }];
    const action = {
      type: CREATE,
      note: { id: 2, title: "title2", content: "content2" }
    };
    const expected = [
      { id: 2, title: "title2", content: "content2" },
      { id: 1, title: "title1", content: "content1" }
    ];
    const result = reducer(initial, action);
    expect(result).toEqual(expected);
  });

  it("should update note for id", () => {
    const initial = [
      { id: 2, title: "title2", content: "content2" },
      { id: 1, title: "title1", content: "content1" }
    ];
    const action = {
      type: UPDATE,
      note: { id: 1, title: "title3", content: "content3" }
    };
    const expected = [
      { id: 2, title: "title2", content: "content2" },
      { id: 1, title: "title3", content: "content3" }
    ];
    const result = reducer(initial, action);
    expect(result).toEqual(expected);
  });

  it("should remove note for id", () => {
    const initial = [
      { id: 2, title: "title2", content: "content2" },
      { id: 1, title: "title1", content: "content1" }
    ];
    const action = { type: REMOVE, id: 1 };
    const expected = [{ id: 2, title: "title2", content: "content2" }];
    const result = reducer(initial, action);
    expect(result).toEqual(expected);
  });
});
