# Guild Chat App

Allows people to create chat rooms and converse. My idea was too have the ability to generate a unique URL, which would link to a 'chat room'. I decided to use `Rails`, because I like `Rails` and how quickly it allows a proof of concept to be built. I toyed with the idea of using `Node` and `Typescript`, but ultimately decided to just stick with something I knew well.  In order to have chats stay up to date, I decided to use Websockets, via `ActionCable`. I have never used `ActionCable` before, so it was fun, and a bit of a headache at times, to get set up. I worked on this over the course of a few days, an hour here and there when I had time.

# Tech Stack
- Rails 5.2 🛤
- React 16 ⚛️
- Webpacker (So I didn't have to fuss with Webpack config) 🛄
- react_rails (easy way to mount components in Rails)
- ActionCable (Websockets) 🔥
- Rspec 📓

# Design Decisions
 ### Models
  - ChatRooms -> have_many messages
  - Messages -> belong_to ChatRooms

- The `db schema` is pretty simple, with just two models.  On `root`, a button allows the creation of a `ChatRoom`, which is just a way to identify the chat. The idea was that when a room was created, the user can share the URL to the room and then converse with whoemever they share the link with. `Messages` are created with the `chat_room_id`, so that you can revisit your chat.

- I would also probably add `Users` at some point, because currently there is now way to know who is saying what. However, I didn't want to deal with authentication or users per the problem request.

- I knew that I wanted to use Websockets, for live updating, so I went with `ActionCable`, since it was built into Rails and seemed to handle my use case. It was fun to setup, but I couldn't get it working locally with `async` and instead had to use `redis`.  I had to modify `config/cable.yml` to use `adapter: redis`, even in development. ActionCable also didn't seem to play nicely with `sqlite` or `mysql`, so I ended up using `Postgres` for the db.

- I used React for the frontend, because I really enjoy the framework; however, I don't think I love integrating React into a rails app. I used webpacker to handle building assets as well as allowing hot reloading, mainly because it works with relatively low configuration (I didn't want to write a `webpack.config`). I also ended up using `react_rails` gem, which allows you to just mount components in `erb` views which is pretty nice.  I didn't venture into React Hooks territory, and instead just used `Classes`. I didn't write any Front End specs, mainly because I ran out of time.

- For testing, I opted for `Rspec` because I like the syntax and it allows for easy controller testing. I just wrote a few basic controller specs, to test routes and create methods.

# What Went Wrong

- This is by no means done, or visually appealing, but all in all was a fun challenge. I also didn't test this on any browsers other than Chrome.  There are a few known issues!

 ### Issue One
  React Components are not mounting correctly, unless the page is hard refreshed. I think this is something to do with the `react_rails` gem. For example, if a user generate a new chat, then click the link to visit the page, the page will be blank unless the user refreshes the page. Obviously, this is a pretty bad bug/experience, that I need to address.

 ### Issue Two
 `ActionCable` is sending messages twice. When a user submits a message, it renders on the screen twice, until the user refreshes the page which renders the collection of messages correctly. My thought is this is a bug with how I am updating `state`, and not `ActionCable` itself, but I need to dig in further to find out for sure.

 ### Issue Three
  The routes aren't very `RESTful`, and are sort of thrown together.

 ### Issue Four
 Lacking FrontEnd specs and specs for `ActionCable`. I've never used `ActionCable` before, so I wasn't totally sure how to approach testing the `broadcast` functionality.

# Getting Started

To run locally:
```
$ ./setup.sh
$ ./start.sh
```
- `ActionCable` requires `redis`. In a seperate terminal instance, just run `redis-server`. Also, in order to run locally you need `Postgres` installed and running. I use [PostgresApp](https://postgresapp.com/). That should be it!
