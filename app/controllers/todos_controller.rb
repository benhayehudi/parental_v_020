class TodosController < ApplicationController

  def index
    @parent = Parent.find_by(params[:id])
    @todo = @parent.todos.build
    @todos = all_todos(@parent)
  end

  def new
    @todo = @parent.todos.build
    render 'todos/index'
  end

  def create
    @parent = Parent.find_by(params[:id])
    @todo = @parent.todos.build(todo_params)
    @todo.parent_id = @parent.id
    @todo.save
    redirect_to request.referrer
  end

  def show
  end

  def update
  end

  def destroy
  end

  private

  def todo_params
    params.require(:todo).permit!
  end

  def all_todos(parent)
    Todo.left_outer_joins(:parent).where('parent_id = ?', @parent.id)
  end
end
