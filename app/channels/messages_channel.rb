class MessagesChannel < ApplicationCable::Channel
  def subscribed
    stream_from "messages_channel"
  end

  def follow(data)
    stop_all_streams
    stream_from "messages:#{data['body']}"
  end

  def unsubscribed
    stop_all_streams
  end
end
