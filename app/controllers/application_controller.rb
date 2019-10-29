class ApplicationController < ActionController::Base
  def current_user
    User.find_by session_token: cookies[:session_token]
  end

  def logged_in?
    !!current_user
  end

  def log_in!(user)
    cookies[:session_token] = user.reset_token!
  end

  def log_out!
    current_user.reset_token
  end

  def require_logged_in
    render json: { errors: 'user not logged in' }, status: :unauthorized if current_user.nil?
  end
end
