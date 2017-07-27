class AdminController < ApplicationController
  before_action :is_admin?

  def index
    @parents = Parent.all
  end

  def show
    @parent = Parent.find_by(id: params[:id])
  end

  private

  def is_admin?
    current_user.id == 1 || current.user.admin == true
  end

end
