class AdminController < ApplicationController
  before_action :is_admin?
  helper_method :current_parent

  def index
    @parents = Parent.all
  end

  def show
    current_parent
  end

  def edit
    current_parent
  end

  def update
    current_parent.update(parent_params)
    current_parent.save
    redirect_to admin_path(current_parent)
  end

  def destroy
    current_parent.delete
    redirect_to admin_index_path
  end

  private

  def parent_params
    params.require(:parent).permit(:name, :email, :admin)
  end

  def is_admin?
    redirect_to new_session_path if !current_user || !current_user.admin == true
  end

  def current_parent
    @parent = Parent.find_by(id: params[:id])
  end

end
