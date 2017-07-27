class TasksController < ApplicationController
  def index
    @todo = Todo.find_by(parent_id: params[:parent_id])
    @task = @todo.tasks.build
  end

  def new
    @task = @todo.tasks.build
    render 'todos/index'
  end

  def create
    @todo = Todo.find_by(id: params[:todo_id])
    @task = @todo.tasks.build(task_params)
    @task.todo_id = @todo.id
    @task.parent_id = @todo.parent_id
    @task.save
    redirect_to request.referrer
  end

  def update
    @task = current_user.tasks.find_by(id: params[:task][:task_id])
    @task.update_attributes(task_params)
    @task.save
    redirect_to request.referrer
  end

  private

  def task_params
    params.require(:task).permit(:title, :parent_id, :todo_id, :id, :done)
  end
end
