import React from 'react';
import {API_ROOT, API_SOCKET_ROOT, HEADERS} from './api_constants';

class ChatRoom extends React.Component {
  state = {
    body: '',
    chatId: '',
    messages: [],
  };

  setUpCable = () => {
    App.messages = App.cable.subscriptions.create(
      {
        channel: 'MessagesChannel',
        body: this.state.body,
        chatId: this.state.chatId,
      },
      {
        connected: function() {
          setTimeout(() => {
            this.perform('subscribed', {body: this.body, chat_id: this.chatId}),
              3000;
          });
        },
        received: function(data) {
          this.updateMessages(data);
        },
        updateMessages: this.updateMessages,
      },
    );
  };

  componentDidMount() {
    this.setUpCable();
    const id = window.location.pathname.split('/')[2];
    fetch(`${API_ROOT}/all_messages/${id}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        return this.setState({
          messages: data.messages,
          chatID: data.chatId,
        });
      });
  }

  createNewMessage = e => {
    const id = window.location.pathname.split('/')[2];
    e.preventDefault();
    fetch(`${API_ROOT}/create_messages`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({
        message: {
          body: this.state.body,
          other: id,
        },
      }),
    }).then(response => {
      this.setState({body: ''});
      return response.json();
    });
  };

  handleChange = e => {
    this.setState({body: e.target.value});
  };

  renderMessages = messages => {
    return messages.map(x => {
      const createdTime = new Date(x.created_at).toString();
      return (
        <span style={styles.individualMessages}>
          <p style={styles.chatMessage} key={`message${x.id}`}>
            {x.body}
          </p>
          <p key={`messages${x.created_at}`}> Sent At: {createdTime}</p>
        </span>
      );
    });
  };

  renderChatBox = messages => {
    return (
      <div style={styles.mainDiv}>
        <div style={styles.messages}>{this.renderMessages(messages)}</div>
        {this.renderInput()}
      </div>
    );
  };

  renderInput = () => {
    return (
      <div style={styles.submitChat}>
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
    );
  };

  updateMessages = message => {
    this.setState({messages: this.state.messages.concat(message)});
  };

  render() {
    return <div>{this.renderChatBox(this.state.messages)}</div>;
  }
}

const styles = {
  button: {
    backgroundColor: '#4CAF50' /* Green */,
    border: 'none',
    color: 'white',
    padding: '16px 16px',
    textAlign: 'center',
    marginTop: '8px',
  },
  mainDiv: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#01a8a5',
    height: '650px',
    width: '650px',
  },
  messages: {
    width: '75%',
    height: '75%',
    background: 'white',
    overflow: 'auto',
  },
  individualMessages: {
    display: 'flex',
    border: '1px solid',
    borderRadius: '25px',
    margin: '8px',
    flexDirection: 'column',
    alignItems: 'center',
  },
  submitChat: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  chatMessage: {
    fontWeight: 'bold',
    fontSize: '16px',
  },
};

export default ChatRoom;
