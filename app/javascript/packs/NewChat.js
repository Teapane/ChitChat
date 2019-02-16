import React, { Component } from "react";

export default class NewChat extends Component {
  state = {
   name: ''
  };

  renderNewChatButton = () => {
    return (
      <div>
         <form onSubmit={this.displayChatOptions}>
          <label>New Chat:</label>
          <br />
          <input
            type="text"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </form>
        <button
          style={styles.button}
          onClick={this.displayChatOptions}
        >
          Create New Chat
        </button>
      </div>
    )
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  displayChatOptions = (e) => {
    const API_ROOT = 'http://localhost:3000';
    const API_WS_ROOT = 'ws://localhost:3000/cable';
    const HEADERS = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    }
    e.preventDefault()
    fetch(`${API_ROOT}/chats`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
  };

  render() {
    return (
      <div>
        {this.renderNewChatButton()}
      </div>
    )
  }
}

const styles = {
  button: {
    backgroundColor: '#4CAF50', /* Green */
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
  }
}

