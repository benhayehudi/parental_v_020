class TodosController < ApplicationController

  def index
    @parent = current_user
    @todo = @parent.todos.build
    @todos = all_todos(@parent)
  end

  def new
    @todo = @parent.todos.build
    render 'todos/index'
  end

  def create
    @parent = current_user
    @todo = @parent.todos.build(todo_params)
    @todo.parent_id = @parent.id
    @todo.save
    redirect_to request.referrer
  end

  def show
    find_todo(@todo)
    @tasks = current_user.tasks.where(todo_id: params[:id])
    @task = @todo.tasks.build
  end

  def update
    find_todo(@todo)
    @todo.update(todo_params)
    @todo.save
    if @todo.done == false
      redirect_to request.referrer
    else
      redirect_to todos_path(current_user)
    end
  end

  def destroy
  end

  private

  def todo_params
    params.require(:todo).permit!
  end

  def find_todo(todo)
    @todo = Todo.find_by(id: params[:id])
  end

  def all_todos(parent)
    Todo.left_outer_joins(:parent).where('parent_id = ?', @parent.id)
  end
end
