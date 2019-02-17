class MessagesChannel < ApplicationCable::Channel
  def subscribed
    conversation = Messages.find(params[:messages])
    stream_for chat_rooms
  end

  def unsubscribed
  end
end
