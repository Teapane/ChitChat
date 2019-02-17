class ChatsController < ApplicationController
  #not really ideal, but...
  skip_before_action :verify_authenticity_token
  respond_to? :json

  def index
    render :index
  end

  def all_chats
    @chats = ChatRoom.all
    render json: @chats.to_json
  end

  def chat_room
    @chat_room = ChatRoom.find_by(url: params[:other])
    render json: @chat_room
  end

  def create
    p params
    record = ChatRoom.create(chat_params)
    generate_unique_url_for_chat(record)
    url = record.url
    render json: url.to_json
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
