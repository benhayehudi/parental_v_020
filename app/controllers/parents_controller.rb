class ParentsController < ApplicationController
  before_action :logged_in?

  def show
    @parent = current_user
    @todo = @parent.todos.build
    @todos = all_todos(@parent)
    @tasks = current_user.tasks.where(todo_id: params[:id])
    @latetodos = @todos.late_todos
    render json: @parent
  end

  private

  def find_todo(todo)
    @todo = Todo.find_by(id: params[:id])
  end

  def all_todos(parent)
    Todo.left_outer_joins(:parent).where('parent_id = ?', @parent.id)
  end
end
