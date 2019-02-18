class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_channel"
  end

  def follow(data)
    stream_from "messages:#{data['body']}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
