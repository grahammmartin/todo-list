require 'rails_helper'

RSpec.describe 'Api::V1::Todos', type: :request do
  let!(:completed_todos) { create_list(:todo, 5, is_completed: true) }
  let!(:pending_todos) { create_list(:todo, 5, is_completed: false) }
  let(:todo_id) { pending_todos.first.id }

  describe 'GET /api/v1/todos' do
    context 'when is_completed is false' do
      before { get '/api/v1/todos', params: { page: 1, per_page: 5, is_completed: false }}

      it 'returns pending todos with status 200' do
        expect(response).to have_http_status(200)
        expect(json).not_to be_empty
        expect(json['todos'].size).to eq(5)
        expect(json['todos'].all? { |todo| todo['is_completed'] == false }).to be true
      end
    end

    context 'when is_completed is true' do
      before { get '/api/v1/todos', params: { page: 1, per_page: 5, is_completed: true }}

      it 'returns completed todos with status 200' do
        expect(response).to have_http_status(200)
        expect(json).not_to be_empty
        expect(json['todos'].size).to eq(5)
        expect(json['todos'].all? { |todo| todo['is_completed'] == true }).to be true
      end
    end

    context 'when is_completed is nil' do
      before { get '/api/v1/todos', params: { page: 1, per_page: 10 } }

      it 'returns all todos with status 200' do
        expect(response).to have_http_status(200)
        expect(json).not_to be_empty
        expect(json['todos'].size).to eq(10)
      end
    end
  end

  describe 'POST /api/v1/todos' do
    let(:valid_attributes) { { todo: { title: 'Complete project report', is_completed: false } } }
    let(:invalid_attributes) { { todo: { title: '' } } }

    context 'when the request is valid' do
      before { post '/api/v1/todos', params: valid_attributes }

      it 'creates a todo and returns status 201' do
        expect(response).to have_http_status(201)
        expect( json.dig('todo', 'title')).to eq('Complete project report')
        expect(json.dig('todo', 'is_completed')).to be false
      end
    end

    context 'when the request is invalid' do
      before { post '/api/v1/todos', params: invalid_attributes}

      it 'returns status 422 with validation errors' do
        expect(response).to have_http_status(422)
        expect(json['todos']).to include("Title can't be blank")
      end
    end
  end

  describe 'PUT /api/v1/todos/:id' do
    let(:valid_attributes) { { todo: { title: 'Update project timeline' } } }

    context 'when the record exists' do
      before { put "/api/v1/todos/#{todo_id}", params: valid_attributes}

      it 'updates the todo and returns status 200' do
        expect(response).to have_http_status(200)
        expect(json.dig('todo', 'title')).to eq('Update project timeline')
      end
    end

    context 'when the record does not exist' do
      let(:todo_id) { 0 }

      before { put "/api/v1/todos/#{todo_id}", params: valid_attributes}

      it 'returns status 404 with a not found message' do
        expect(response).to have_http_status(404)
        expect(response.body).to match(/Couldn't find Todo/)
      end
    end
  end

  describe 'DELETE /api/v1/todos/:id' do
    before { delete "/api/v1/todos/#{todo_id}"}

    it 'deletes the todo and returns status 200 with a success message' do
      expect(response).to have_http_status(200)
      expect(json['message']).to match(/Todo deleted successfully/)
    end
  end
end

def json
  JSON.parse(response.body)
end
