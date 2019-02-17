class ChatRoom < ApplicationRecord
  has_many :messages
  scope :all_messages, -> { joins(:messages).all.map(&:body) }
end
