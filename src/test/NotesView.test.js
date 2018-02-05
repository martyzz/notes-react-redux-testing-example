import React from "react";
import { shallow } from "enzyme";

import NotesView from "../components/NotesView";
import Note from "../components/Note";

const createWrapper = props => {
  const callback = () => null;
  return shallow(
    <NotesView {...props} onNoteUpdate={callback} onNoteRemove={callback} />
  );
};

describe("<NotesView/>", () => {
  it("should render without crashing", () => {
    let wrapper = createWrapper({ notes: [] });
    expect(wrapper).toHaveLength(1);
  });

  it("should render correct amount of <Note/> components", () => {
    const notes = [
      { id: 2, title: "title2", content: "content2" },
      { id: 1, title: "title1", content: "content1" }
    ];
    let wrapper = createWrapper({ notes });
    expect(wrapper.find(Note)).toHaveLength(notes.length);
  });
});
