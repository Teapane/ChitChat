import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import NewChat from './NewChat';

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
