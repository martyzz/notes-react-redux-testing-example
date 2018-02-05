import React from "react";
import { shallow } from "enzyme";

import NoteCreate from "../components/NoteCreate";
import { UnconnectedApp } from "../components/App";

const createWrapper = props => {
  const defaultProps = {
    onNoteCreate: () => null
  };
  const realProps = { ...defaultProps, ...props };
  return shallow(<NoteCreate {...realProps} />);
};

const createUnconnectedAppWraper = props => {
  const defaultProps = {
    notesCreate: () => null,
    notesUpdate: () => null,
    notesRemove: () => null,
    notes: []
  };
  const realProps = { ...defaultProps, ...props };
  return shallow(<UnconnectedApp {...realProps} />);
};

describe("<NoteCreate/>", () => {
  it("should render without crashing", () => {
    const wrapper = createWrapper({});
    expect(wrapper).toHaveLength(1);
  });

  it("should have input that is controled by its state", () => {
    const wrapper = createWrapper({});
    wrapper
      .find("input")
      .simulate("change", { target: { value: "new value input" } });

    expect(wrapper.state("title")).toEqual("new value input");
  });

  it("should have textarea that is controlled by its state", () => {
    const wrapper = createWrapper({});
    wrapper
      .find("textarea")
      .simulate("change", { target: { value: "new value textarea" } });

    expect(wrapper.state("content")).toEqual("new value textarea");
  });

  it("should propagate onNoteCreate to <App/> with new created note on button click", () => {
    const createCallbackMock = jest.fn();
    const unconnectedAppWrapper = createUnconnectedAppWraper({
      notesCreate: createCallbackMock
    });

    const noteCreateWrapper = unconnectedAppWrapper.find(NoteCreate).dive();

    // simulate adding title

    noteCreateWrapper
      .find("input")
      .simulate("change", { target: { value: "new title" } });

    // simulate adding content
    noteCreateWrapper
      .find("textarea")
      .simulate("change", { target: { value: "new content" } });

    // simulate clicking button
    noteCreateWrapper.find("button").simulate("click");

    // expect method to be propagated to app
    expect(createCallbackMock).toHaveBeenCalledWith({
      title: "new title",
      content: "new content"
    });

    // expect states to be cleared
    expect(noteCreateWrapper.state("title")).toHaveLength(0);
    expect(noteCreateWrapper.state("content")).toHaveLength(0);
  });
});
