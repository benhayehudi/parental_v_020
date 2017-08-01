require 'securerandom'
class RegistrationsController < ApplicationController

  def new
    @parent = Parent.new
  end

  def create
    @parent = Parent.new(parent_params)
    if @parent.save
      session[:user_id] = @parent.id
      redirect_to parent_path(@parent)
    else
      flash[:alert] = "signup failed. please try again."
      redirect_to '/registrations/new'
    end
  end

  def facebook
    @parent = Parent.find_or_create_by(uid: auth['uid'])
    @parent.name = auth['info']['name']
    @parent.email = auth['info']['email']
    @parent.image = auth['info']['image']
    @parent.password = SecureRandom.hex
    @parent.save

    session[:parent_id] = @parent.id
    redirect_to parent_path(@parent)
  end

  def twitter
    @parent = Parent.find_or_create_by(uid: auth['uid'])
    @parent.name = auth['info']['name']
    @parent.email = auth['info']['email']
    @parent.image = auth['info']['image']
    @parent.password = SecureRandom.hex
    @parent.save
    raise @parent.inspect
    session[:parent_id] = @parent.id
    redirect_to parent_path(@parent)
  end


  private

  def auth
    request.env['omniauth.auth']
  end

  def parent_params
    params.require(:parent).permit(:name, :email, :password, :password_confirmation)
  end
end
