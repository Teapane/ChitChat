import React, { Component } from 'react';
import {API_ROOT, API_WS_ROOT, HEADERS } from
'./api_constants';

export default class NewChat extends Component {
  state = {
    name: '',
    chats: []
  };

  componentDidMount() {
    fetch(`${API_ROOT}/all_chats`)
      .then(response => {
        return response.json();
      })
      .then((chats) => {
        return this.setState({ chats })
      });
  }

  renderChats = (chats) => {
    return (
      chats.map((x) => {
        <div>
          {x.name}
        </div>
      })
    );
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
    e.preventDefault()
    fetch(`${API_ROOT}/chats`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state)
    });
  };

  render() {
    console.log(this.state)
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

