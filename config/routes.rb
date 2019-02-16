Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root 'chats#index'
  resources :chats, only: [:index, :create, :show]

  #Allow websockets for our chats!
  mount ActionCable.server => '/cable'
end
