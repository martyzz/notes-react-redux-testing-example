import React, { Component } from "react";
import { connect } from "react-redux";

import NotesView from "./NotesView";
import NoteCreate from "./NoteCreate";
import { notesCreate, notesUpdate, notesRemove } from "../actions/notesActions";

import "../assets/css/App.css";

export class UnconnectedApp extends Component {
  render() {
    const { notes, notesUpdate, notesRemove, notesCreate } = this.props;

    return (
      <div className="App">
        <h1>Notes</h1>
        <h3>Create a new note</h3>
        <NoteCreate onNoteCreate={notesCreate} />
        <h3>List of notes</h3>
        <NotesView
          notes={notes}
          onNoteUpdate={notesUpdate}
          onNoteRemove={notesRemove}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { notes } = state;

  return {
    notes
  };
};

const mapDispatchToProps = {
  notesCreate,
  notesUpdate,
  notesRemove
};

const App = connect(mapStateToProps, mapDispatchToProps)(UnconnectedApp);

export default App;
