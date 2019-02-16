class CreateChatRooms < ActiveRecord::Migration[5.2]
  def change
    create_table :chat_rooms do |t|
      t.string :name, default: ''
      t.string :url, default: ''
      t.timestamps
    end
  end
end
