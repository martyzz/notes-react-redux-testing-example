import uuidv1 from "uuid/v1";
import { CREATE, UPDATE, REMOVE } from "../types/notesTypes";

export const notesCreate = (note, shouldGenerateId = true) => {
  return {
    type: CREATE,
    note: shouldGenerateId ? { ...note, id: uuidv1() } : note
  };
};

export const notesUpdate = note => {
  return {
    type: UPDATE,
    note
  };
};

export const notesRemove = id => {
  return {
    type: REMOVE,
    id
  };
};
