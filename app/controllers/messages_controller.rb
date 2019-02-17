class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  respond_to? :json

  def index
    @chat_room = ChatRoom.find_by(url: params[:other])
    @messages = Message.all_messages
    render :index
  end

  def create
    @messages = @chat_room.messages.create(body: body)
    render json: @messages
  end

  private

  def message_params
    params.require(:message).permit(:body, :other)
  end
end
