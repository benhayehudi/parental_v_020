class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :logged_in?

  private

  def current_user
  @current_user ||= Parent.find_by(id: session[:parent_id])
  end
  helper_method :current_user


  def logged_in?
    redirect_to new_session_path if !session[:parent_id]
  end


end
