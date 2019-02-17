import React from 'react';
import {API_ROOT, API_WS_ROOT, HEADERS} from './api_constants';

class ChatRoom extends React.Component {
  state = {
    body: '',
  };

  createNewMessage = e => {
    e.preventDefault();
    fetch(`${API_ROOT}/create_messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({"message": {
        body: this.state.body,
        other: 'ud'
      }}),
    }).then(response => {
      return response.json();
    });
  };

  handleChange = e => {
    this.setState({body: e.target.value});
  };

  render() {
    console.log(window.location)
    return (
      <div>
        "HI CHAT ROOM"
        <div>
          <form onSubmit={this.createNewMessage}>
            <label>New Message:</label>
            <br />
            <input
              type="text"
              value={this.state.body}
              onChange={this.handleChange}
            />
          </form>
          <button style={styles.button} onClick={this.createNewMessage}>
            Create New Message
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  button: {
    backgroundColor: '#4CAF50' /* Green */,
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
  },
};
export default ChatRoom;
