import React, { Component } from 'react';
import {API_ROOT, API_WS_ROOT, HEADERS } from
'./api_constants';
import ChatRoom from './ChatRoom';

export default class NewChat extends Component {
  state = {
    name: '',
    chats: [],
    room: ''
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
    return chats.map((x) => {
      return (
        <span>
          <p key={x.id}> {x.name} </p>
          <p key={`${x.id} + created_at`}> {x.created_at} </p>
        </span>
      )
    })
  };

  renderNewChatButton = () => {
    return (
      <div>
         <form onSubmit={this.createNewChat}>
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
          onClick={this.createNewChat}
        >
          Create New Chat
        </button>
      </div>
    )
  }

  handleChange = e => {
    this.setState({ name: e.target.value });
  };

  createNewChat = (e) => {
    e.preventDefault()
    fetch(`${API_ROOT}/create_chats`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(this.state.name)
    }).then((response) => {
      return response.json()
    }).then((room) => {
      return this.setState({chats: [], room: room})
    })
  };

  render() {
    console.log(window.location.pathname)
    console.log(this.state)
    if (this.state.room == ''){
      return (
        <div>
          {this.renderNewChatButton()}
          {this.renderChats(this.state.chats)}
        </div>
      )
    } else {
      return (
        <ChatRoom />
      );
    };
  };
};

const styles = {
  button: {
    backgroundColor: '#4CAF50', /* Green */
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
  }
}

