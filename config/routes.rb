Rails.application.routes.draw do
  root 'chats#index'
  get 'chats/:id/*url', to: 'messages#index'
  get 'all_chats', to: 'chats#all_chats'
  get 'all_messages/:id', to: 'messages#all_messages'

  post 'create_chats', to: 'chats#create'
  post 'create_messages', to: 'messages#create'

  #Allow websockets for our chats!
  mount ActionCable.server => '/cable'
end
