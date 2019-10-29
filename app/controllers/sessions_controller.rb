class SessionsController < ApplicationController
  def create
    @user = User.from_twitter(request.env['omniauth.auth'])
    # create or login user here
    # render json: @user
    # redirect_to root_url
    redirect_to 'https://twitter.com/GhostOfJohnGode'
  end
end
