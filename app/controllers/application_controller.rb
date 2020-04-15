class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token if ENV['RAILS_ENV'] != 'production'

  def current_user
    return nil if not cookies[:session_token]
    User.find_by session_token: cookies[:session_token]
  end

  def logged_in?
    !!current_user
  end

  def log_in!(user)
    cookies[:session_token] = user.reset_token!
  end

  def log_out!
    current_user.reset_token!
  end

  def require_logged_in
    render json: { errors: 'user not logged in' }, status: :unauthorized if not logged_in?
  end
end
