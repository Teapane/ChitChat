class ChatsController < ApplicationController
  #not really ideal, but...
  skip_before_action :verify_authenticity_token

  def index
    render :index
  end

  def all_chats
    chats = ChatRoom.all
    render json: chats.to_json
  end

  def chat_room
    chat_room = ChatRoom.find_by(url: params[:url])
    render json: chat_room.to_json
  end

  def create
    record = ChatRoom.create(chat_params)
    generate_unique_url_for_chat(record)
    url = record.url
    id = record.id

    render json: {
      url:  url,
      id: id
    }.to_json
  end

  private

  #This creates a unique url that can be used for a private chat
  def generate_unique_url_for_chat(record)
    url = SecureRandom.alphanumeric(10)
    record.update_attribute(:url, url) if record
  end

  def chat_params
    params.require(:chat).permit(:name)
  end
end
