class Api::ImagesController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :require_logged_in, only: [:create]

  def index
    @images = Image.all
    render :index, status: 200
  end

  def show
    @image = Image.find params[:id]
    render :show, status: 200
  end

  def create
    @image = Image.new image_params
    @image.admin = current_user

    if @image.save
      render :show, status: 200
    else
      render json: { error: '422 unprocessable entity' }, status: 422
    end
  end

  private

    def image_params
      params.require(:image).permit(:title, :asset)
    end

    def record_not_found
      render json: { errors: '404 image record not found' }, status: 404
    end
end
