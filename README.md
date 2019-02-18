# Guild Chat App

 - Allows people to create chat rooms and converse!

# Design Decisions
 - Models
  - ChatRooms -> have_many messages
  - Messages -> belong_to ChatRooms


# Tech Stack
- Rails 5.2
- React 16
- Webpacker (So I didn't have to fuss with Webpack config)
- react_rails (easy way to mount components in Rails)
- ActionCable (Websockets)
- Rspec

# Getting Started

To run locally:
```
$ ./setup.sh
$ ./start.sh
```
That should be it! ActionCable requires `redis`. In a seperate terminal instance, just run `redis-server`.

# User Interaction

