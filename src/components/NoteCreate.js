import React, { Component } from "react";
import PropTypes from "prop-types";

class NoteCreate extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      content: ""
    };
  }

  onCreate() {
    const { title, content } = this.state;
    const { onNoteCreate } = this.props;
    onNoteCreate({ title, content });
    this.setState({ title: "", content: "" });
  }

  render() {
    const { title, content } = this.state;

    return (
      <div className="NoteCreate">
        <input
          type="text"
          value={title}
          placeholder="Title"
          onChange={({ target: { value } }) => this.setState({ title: value })}
        />
        <br />
        <textarea
          value={content}
          placeholder="Content"
          onChange={({ target: { value } }) =>
            this.setState({ content: value })
          }
        />
        <br />
        <button onClick={this.onCreate.bind(this)}>create</button>
      </div>
    );
  }
}

NoteCreate.propTypes = {
  onNoteCreate: PropTypes.func.isRequired
};

export default NoteCreate;
