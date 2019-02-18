require 'rails_helper'

RSpec.describe MessagesController, type: :controller do

  describe 'GET #all_messages' do
    it 'responds correctly' do
      chat = ChatRoom.create(name: 'TEST')
      message = Message.create(body: 'Hi RSPEC', chat_room_id: chat.id)

      get :all_messages, params: { id: chat.id }

      body = JSON.parse(response.body)

      expect(response.status).to eq(200)
      expect(body["messages"][0]["chat_room_id"]).to eq(chat.id)
      expect(body["messages"][0]["body"]).to eq('Hi RSPEC')
    end
  end

  describe 'POST #create' do
    it 'creates a message' do
      chat = ChatRoom.create(name: 'Chit Chat!')
      expect {
        post :create, params: {message: { body: 'HI', other: chat.id } }, format: :json
      }.to change {
        Message.count
      }.by(1)
    end
  end
end
