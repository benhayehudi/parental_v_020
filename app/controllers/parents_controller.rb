class ParentsController < ApplicationController
  before_action :logged_in?

  def show
    @parent = Parent.find_by(uid: auth['uid'])
    @todos = all_todos(@parent)
    @todo = Todo.find_by(parent_id: params[:id])
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
