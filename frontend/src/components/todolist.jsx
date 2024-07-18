import React, { Component } from "react";
import "../App.css";
class Todos extends Component {
  render() {
    return (
      <li>
        {this.props.todoText}
        <button
          type="button"
          className="btn btn-primary"
          onClick={this.props.onDelete}
        >
          Delete
        </button>
      </li>
    );
  }
}

export default Todos;
