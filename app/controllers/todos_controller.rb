class TodosController < ApplicationController
  before_action :logged_in?

  def index
    @parent = current_user
    @todo = @parent.todos.build
    @todos = all_todos(@parent)
  end

  def new
    @todo = Todo.new
    @task = @todo.tasks.build
  end

  def create
    @parent = current_user
    @todo = Todo.new(todo_params)
    @todo.parent_id = @parent.id
    if @todo.save
      respond_to do |f|
        f.json {render :json => @todo}
        f.html { redirect_to request.referrer }
      end
    end
  end

  def show
    find_todo(@todo)
    @tasks = current_user.tasks.where(todo_id: params[:id])
    @task = @todo.tasks.build
    render :json => @todo
  end

  def update
    find_todo(@todo)
    @todo.update(todo_params)
    @todo.save
    if @todo.done == false
      redirect_to parent_todo_path(@todo)
    else
      redirect_to parent_todo_path(@todo)
    end
  end

  def destroy
  end

  private

  def todo_params
    params.require(:todo).permit(:title, :address, :done, :description, :parent_id, :duedate, tasks_attributes: [:title, :parent_id, :todo_id, :id])
  end

  def find_todo(todo)
    @todo = Todo.find_by(id: params[:id])
  end

  def all_todos(parent)
    Todo.left_outer_joins(:parent).where('parent_id = ?', @parent.id)
  end
end
