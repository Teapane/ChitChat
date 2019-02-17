Rails.application.routes.draw do
  root 'chats#index'
  get 'chats/*other', to: 'messages#index'
  get 'all_chats', to: 'chats#all_chats'
  post 'create_chats', to: 'chats#create'
  post 'create_messages', to: 'messages#create'

  #Allow websockets for our chats!
  mount ActionCable.server => '/cable'
end
