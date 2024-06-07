class Api::V1::TodosController < ApplicationController
  before_action :set_todo, only: [ :update, :destroy ]

  def index
    page = params[:page] || 1
    per_page = params[:per_page] || 10

    todos = filter_todos.reorder("updated_at DESC").page(page).per(per_page)
    render json: todos, each_serializer: TodoSerializer, meta: pagination_meta(todos)
  end

  def create
    todo = Todo.new(todo_params)
    if todo.save
      render json: todo, serializer: TodoSerializer, status: :created
    else
      render json: todo.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    if @todo.update(todo_params)
      render json: @todo, serializer: TodoSerializer, status: :ok
    else
      render json: @todo.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    if @todo.destroy
      render json: { message: "Todo deleted successfully" }, status: :ok
    else
      render json: { message: "Todo could not be deleted" }, status: :unprocessable_entity
    end
  end

  private

  def filter_todos
    return Todo unless params[:is_completed].present?

    params[:is_completed] == "true" ? Todo.completed : Todo.pending
  end

    def set_todo
      @todo = Todo.find(params[:id])
    end

    def todo_params
      params.require(:todo).permit(:title, :description, :is_completed)
    end

    def pagination_meta(todos)
      {
        current_page: todos.current_page,
        next_page: todos.next_page,
        prev_page: todos.prev_page,
        total_pages: todos.total_pages,
        total_count: todos.total_count
      }
    end
end
