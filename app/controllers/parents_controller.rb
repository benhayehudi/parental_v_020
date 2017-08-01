class ParentsController < ApplicationController
  before_action :logged_in?

  def show
    @parent = current_user
    @todos = all_todos(@parent)
    find_todo(@todo)
    @tasks = current_user.tasks.where(todo_id: params[:id])
  end

  private

  def find_todo(todo)
    @todo = Todo.find_by(id: params[:id])
  end

  def all_todos(parent)
    Todo.left_outer_joins(:parent).where('parent_id = ?', @parent.id)
  end
end
