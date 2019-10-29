class SessionsController < ApplicationController
  def create
    @user = User.from_twitter(request.env['omniauth.auth'])
    log_in! @user
    redirect_to root_url authenticated: true
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
    render json: {}
  end
end
