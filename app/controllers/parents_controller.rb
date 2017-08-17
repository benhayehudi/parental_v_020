class ParentsController < ApplicationController
  before_action :logged_in?

  def index
    @todo = Todo.find_by(params[:id])
  end
  
  def show
    @current_todo = find_todo(@current_todo) || @current_todo = current_user.todos.first
    @parent = current_user
    @todo = @parent.todos.build
    @todos = all_todos(@parent)
    @tasks = current_user.tasks.where(todo_id: params[:id])
    @task = @todo.tasks.build
  end

  private

  def find_todo(todo)
    @todo = Todo.find_by(id: params[:id])
  end

  def all_todos(parent)
    Todo.left_outer_joins(:parent).where('parent_id = ? AND done = ?', @parent.id, false)
  end
end
