class Auth::SessionsController < ApplicationController
  def create
    @user = User.from_uid request.env['omniauth.auth'].uid.to_i
    if @user.nil?
      redirect_to :unauthorized
    else
      log_in! @user
      redirect_to :admin
    end
  end

  # temporary response behavior until this is better planned
  def show
    @user = current_user
    if @user.nil?
      render json: {}
    else
      render json: @user
    end
  end

  # temporary response behavior until this is better planned
  def destroy
    log_out! if !current_user.nil?
    redirect_to root_url
  end
end
