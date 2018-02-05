import { notesCreate, notesUpdate, notesRemove } from "../actions/notesActions";
import { CREATE, UPDATE, REMOVE } from "../types/notesTypes";

describe("notesActions", () => {
  it("should create an action for creating a note", () => {
    const note = { title: "title1", content: "content1" };
    const expected = {
      type: CREATE,
      note
    };
    const result = notesCreate(note, false); // should not generate id
    expect(result).toEqual(expected);
  });

  it("should generate new unique id for created note", () => {
    const note = { title: "title1", content: "content1" };
    const result = notesCreate(note);
    expect(result.note.id).toBeDefined();
  });

  it("should create an action for updating a note", () => {
    const note = { id: 1, title: "title1", content: "content1" };
    const expected = {
      type: UPDATE,
      note
    };
    const result = notesUpdate(note);
    expect(result).toEqual(expected);
  });

  it("should create an action for removing a note", () => {
    const id = 1;
    const expected = {
      type: REMOVE,
      id
    };
    const result = notesRemove(id);
    expect(result).toEqual(expected);
  });
});
