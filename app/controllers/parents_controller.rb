class ParentsController < ApplicationController
  before_action :logged_in?

  def index
    @todo = Todo.find_by(params[:id])
  end
  
  def show
    @todo_url = request.env['HTTP_X_REQUESTED_WITH']
    if @todo_url != nil
      todo_id = request.env['HTTP_X_REQUESTED_WITH'].split("/")[3]
      @current_todo = Todo.find_by(id: todo_id)
    else
      todo_id = "1"
      @current_todo = Todo.find_or_create_by(id: todo_id)
    end
    @parent = current_user
    @todo = @parent.todos.build
    @todos = all_todos(@parent)
    @tasks = current_user.tasks.where(todo_id: params[:id])
    @task = @todo.tasks.build
    latetodos = @todos.late_todos
  end

  private

  def find_todo(todo)
    @todo = Todo.find_by(id: params[:id])
  end

  def all_todos(parent)
    Todo.left_outer_joins(:parent).where('parent_id = ? AND done = ?', @parent.id, false)
  end
end
