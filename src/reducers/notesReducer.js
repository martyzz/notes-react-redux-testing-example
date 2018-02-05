import { CREATE, UPDATE, REMOVE } from "../types/notesTypes";

export default (state = [], action) => {
  switch (action.type) {
    case CREATE:
      return [action.note, ...state];

    case UPDATE:
      return state.map(
        note => (note.id === action.note.id ? action.note : note)
      );

    case REMOVE:
      return state.filter(note => note.id !== action.id);

    default:
      return state;
  }
};
