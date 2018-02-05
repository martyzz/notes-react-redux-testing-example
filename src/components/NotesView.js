import React from "react";
import PropTypes from "prop-types";

import Note from "./Note";

const NotesView = ({ notes, onNoteUpdate, onNoteRemove }) => (
  <div className="NotesView">
    {notes.map(note => (
      <Note
        {...note}
        key={note.id}
        onUpdate={onNoteUpdate}
        onRemove={onNoteRemove}
      />
    ))}
  </div>
);

NotesView.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ).isRequired,
  onNoteUpdate: PropTypes.func.isRequired,
  onNoteRemove: PropTypes.func.isRequired
};

export default NotesView;
