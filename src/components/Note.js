import React, { Component } from "react";
import PropTypes from "prop-types";

import "../assets/css/Note.css";

class Note extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      inputTitle: "",
      inputContent: ""
    };
  }

  renderInputs() {
    const { inputTitle, inputContent } = this.state;

    return (
      <div className="inputs">
        <input
          type="text"
          placeholder="Title"
          onChange={({ target: { value } }) =>
            this.setState({ inputTitle: value })
          }
          value={inputTitle}
        />
        <br />
        <textarea
          placeholder="Content"
          onChange={({ target: { value } }) =>
            this.setState({ inputContent: value })
          }
          value={inputContent}
        />
      </div>
    );
  }

  renderDisplay() {
    const { title, content } = this.props;

    return (
      <div className="display">
        <h3>{title}</h3>
        <p>{content}</p>
      </div>
    );
  }

  onToggleEditing() {
    const { isEditing, inputTitle, inputContent } = this.state;
    const { id, title, content, onUpdate } = this.props;
    let newState;

    if (!isEditing) {
      newState = { isEditing: true, inputTitle: title, inputContent: content };
    } else {
      newState = { isEditing: false };
      onUpdate({ id, title: inputTitle, content: inputContent });
    }

    this.setState(newState);
  }

  render() {
    const { id, onRemove } = this.props;
    const { isEditing } = this.state;

    return (
      <div className="Note">
        <button className="remove" onClick={() => onRemove(id)}>
          del
        </button>

        <button className="editing" onClick={this.onToggleEditing.bind(this)}>
          {isEditing ? "save" : "edit"}
        </button>

        {isEditing ? this.renderInputs() : this.renderDisplay()}
      </div>
    );
  }
}

Note.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired
};

export default Note;
