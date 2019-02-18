import React from 'react';
import {API_ROOT, API_SOCKET_ROOT, HEADERS} from './api_constants';
import ChatRoom from './ChatRoom';

class NewChat extends React.Component {
  state = {
    name: '',
    chats: [],
  };

  componentDidMount() {
    this.fetchChats();
  }

  fetchChats = () => {
    fetch(`${API_ROOT}/all_chats`)
      .then(response => {
        return response.json();
      })
      .then(chats => {
        return this.setState({chats});
      });
  };

  renderChats = chats => {
    return chats.map(x => {
      const name = x.name;
      return (
        <span>
          <a href={`${window.location.href}chats/${x.id}/${x.url}`}> Visit {name}</a>
          <p key={`${x.id} + created_at`}> {x.created_at} </p>
        </span>
      );
    });
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
        <button style={styles.button} onClick={this.createNewChat}>
          Create New Chat
        </button>
      </div>
    );
  };

  handleChange = e => {
    this.setState({name: e.target.value});
  };

  createNewChat = e => {
    e.preventDefault();
    fetch(`${API_ROOT}/create_chats`, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify({name: this.state.name}),
    }).then(() => {
      this.setState({name: ''});
      this.fetchChats();
    });
  };

  render() {
    return (
      <div style={styles.mainDiv}>
        <div style={styles.newChatDiv}>{this.renderNewChatButton()}</div>
        <div style={styles.existingChats}>
          {this.renderChats(this.state.chats)}
        </div>
      </div>
    );
  }
}

const styles = {
  mainDiv: {
    display: 'flex',
    backgroundColor: 'grey',
    flexDirection: 'column',
    alignItems: 'center',
    height: '800px',
  },
  newChatDiv: {
    display: 'flex',
    margin: '16px',
  },
  existingChats: {
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    height: '50%',
    width: '75%',
    alignItems: 'center',
    backgroundColor: '#01a8a5', /* Guild Blue :)*/
    justifyContent: 'space-between'
  },
  button: {
    backgroundColor: '#01a8a5', /* Guild Blue :)*/
    border: 'none',
    color: 'white',
    padding: '15px 32px',
    textAlign: 'center',
  },
};

export default NewChat;
