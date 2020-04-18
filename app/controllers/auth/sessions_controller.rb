class Auth::SessionsController < ApplicationController
  def create
    uid = request.env['omniauth.auth'].uid.to_i
    screen_name = request.env['omniauth.auth'].info.nickname
    @user = User.from_auth uid: uid, screen_name: screen_name.downcase

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

  def refresh
    client = Twitter::REST::Client.new(TWITTER_CLIENT_CONFIG)
    @user = current_user

    profile = client.user(@user.uid.to_i)
    @user.refresh_screen_name(profile.screen_name.downcase)

    render :show
  end

  # temporary response behavior until this is better planned
  def destroy
    log_out! if !current_user.nil?
    render json: {}
  end
end
