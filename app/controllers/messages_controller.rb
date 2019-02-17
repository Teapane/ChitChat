class MessagesController < ApplicationController

  def index
    ChatRoom.find_by(url: params[:url])
    render plain: "ok"
  end

  def create
    url = params[:url]
    body = params[:body]

    ChatRoom.find_by(url: url).id
    chatroom.messages.create(body: body)

    render json: chatroom.all_messages
  end
end
