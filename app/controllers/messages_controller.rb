class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  respond_to? :json

  def index
    chat_room = ChatRoom.find_by(url: params[:other])
    messages = chat_room.messages
    render :index
  end

  def all_messages
    chat_room = ChatRoom.find(params[:id])
    messages = chat_room.messages
    render json: {
      messages: messages,
      chatId: chat_room.id
    }.to_json
  end

  def create
    body = params[:message][:body]
    chat = ChatRoom.find(params[:message][:other])
    message = chat.messages.create(body: body)
    chat_cable(message)

    render json: message
  end


  def chat_cable(message)
    ActionCable.server.broadcast(
      "messages_channel",
      id: message.id,
      chat_room_id: message.chat_room_id,
      body: message.body,
      created_at: message.created_at,
      updated_at: message.updated_at
    )
  end

  private

  def message_params
    params.require(:message).permit(:body, :other)
  end
end
