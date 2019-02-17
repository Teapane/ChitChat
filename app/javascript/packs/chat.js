import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import NewChat from './NewChat';
import ChatRoom from './ChatRoom';

const Hello = (props) => (
  <div>
    <NewChat />
  </div>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Hello name="Joe" />,
    document.body.appendChild(document.createElement('div')),
  )
})
