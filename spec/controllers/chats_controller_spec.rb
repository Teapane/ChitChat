require 'rails_helper'

RSpec.describe ChatsController, type: :controller do
  describe 'GET index' do
    it "responds correctly" do
      get :index
      expect(response.status).to eq(200)
    end

    it 'returns all chats' do
      chat = ChatRoom.create(name: 'TEST')
      chat2 = ChatRoom.create(name: 'SECOND CHAT')

      get :index

      resp = JSON.parse(response.body)
      expect(resp[0]['name']).to eq('TEST')
      expect(resp[0]['url']).to be_a_kind_of(String)
      expect(resp[1]['name']).to eq('SECOND CHAT')
      expect(resp[1]['url']).to be_a_kind_of(String)
    end
  end

  describe 'POST #create' do
    it 'creates a new chat room with correct params' do
      post :create, params: {chat: { name: 'New Chat Room' }}
      expect(response.status).to eq(204)
    end
  end
end
