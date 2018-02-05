import React from "react";
import { shallow } from "enzyme";

import App, { UnconnectedApp } from "../components/App";

describe("<App/>", () => {
  let wrapperUnconnected;

  beforeEach(() => {
    const notes = [];
    const callback = () => null;
    wrapperUnconnected = shallow(
      <UnconnectedApp
        notes={[]}
        notesCreate={callback}
        notesUpdate={callback}
        notesRemove={callback}
      />
    );
  });

  it("should render unconnected without crashing", () => {
    expect(wrapperUnconnected).toHaveLength(1);
  });
});
