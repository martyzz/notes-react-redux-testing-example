import React from "react";
import { shallow } from "enzyme";

import Note from "../components/Note";
import { UnconnectedApp } from "../components/App";
import NotesView from "../components/NotesView";

const createWrapper = props => {
  const callback = () => null;
  return shallow(<Note {...props} onUpdate={callback} onRemove={callback} />);
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

describe("<Note/>", () => {
  it("should render without crashing", () => {
    const note = { id: 1, title: "title1", content: "content1" };
    const wrapper = createWrapper(note);
    expect(wrapper).toHaveLength(1);
  });

  it("should toggle isEditing in state on button click", () => {
    const note = { id: 1, title: "title1", content: "content1" };
    const wrapper = createWrapper(note);
    wrapper.setState({ isEditing: true });

    wrapper.find("button.editing").simulate("click");
    expect(wrapper.state("isEditing")).toBe(false);

    wrapper.find("button.editing").simulate("click");
    expect(wrapper.state("isEditing")).toBe(true);
  });

  it("should render correct components on either of isEditing value", () => {
    const note = { id: 1, title: "title1", content: "content1" };
    const wrapper = createWrapper(note);

    wrapper.setState({ isEditing: true });
    expect(wrapper.find(".inputs")).toHaveLength(1);

    wrapper.setState({ isEditing: false });
    expect(wrapper.find(".display")).toHaveLength(1);
  });

  it("should copy data from props once isEditing is set to true", () => {
    const note = { id: 1, title: "title1", content: "content1" };
    const wrapper = createWrapper(note);
    wrapper.setState({ isEditing: false });
    wrapper.find("button.editing").simulate("click");

    expect(wrapper.state("inputTitle")).toEqual(note.title);
    expect(wrapper.state("inputContent")).toEqual(note.content);
  });

  it("should have inputs behaving like controlled components", () => {
    const note = { id: 1, title: "title1", content: "content1" };
    const wrapper = createWrapper(note);
    wrapper.setState({ isEditing: true });

    wrapper
      .find(".inputs input")
      .simulate("change", { target: { value: "test" } });
    expect(wrapper.state("inputTitle")).toEqual("test");

    wrapper
      .find(".inputs textarea")
      .simulate("change", { target: { value: "test2" } });
    expect(wrapper.state("inputContent")).toEqual("test2");
  });

  describe("propagation to <App/>", () => {
    it("should call from <Note/> to <App/> on remove with id", () => {
      const removeCallbackMock = jest.fn();
      const notes = [
        { id: 2, title: "title2", content: "content2" },
        { id: 1, title: "title1", content: "content1" }
      ];
      const unconnectedAppWrapper = createUnconnectedAppWraper({
        notes,
        notesRemove: removeCallbackMock
      });
      const index = 1;

      // simulate click
      unconnectedAppWrapper
        .find(NotesView)
        .dive()
        .find(Note)
        .at(index)
        .dive()
        .find("button.remove")
        .simulate("click");

      expect(removeCallbackMock).toHaveBeenCalledWith(notes[index].id);
    });

    it("should call from <Note/> to <App/> on update (isEditing toggled false) with updated note", () => {
      const updateCallbackMock = jest.fn();
      const notes = [
        { id: 2, title: "title2", content: "content2" },
        { id: 1, title: "title1", content: "content1" }
      ];
      const unconnectedAppWrapper = createUnconnectedAppWraper({
        notes,
        notesUpdate: updateCallbackMock
      });
      const index = 1;

      const noteWrapper = unconnectedAppWrapper
        .find(NotesView)
        .dive()
        .find(Note)
        .at(index)
        .dive();


      // open input

      noteWrapper.find("button.editing").simulate("click");

      // change value of inputs
      noteWrapper
        .find(".inputs input")
        .simulate("change", { target: { value: "new value input" } });

      noteWrapper
        .find(".inputs textarea")
        .simulate("change", { target: { value: "new value textarea" } });

      // close input
      noteWrapper.find("button.editing").simulate("click");

      expect(updateCallbackMock).toHaveBeenCalledWith({
        ...notes[index],
        title: "new value input",
        content: "new value textarea"
      });
    });
  });
});
