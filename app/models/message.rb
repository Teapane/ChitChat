class Message < ApplicationRecord
  belongs_to :chat_room
  scope :all_messages, -> { joins(:chat_room).where.not(body: nil) }
end
