class Api::ImageTagsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  before_action :require_logged_in

  def create
    @image = Image.find image_tag_params[:image_id]
    @tag = Tag.find image_tag_params[:tag_id]

    if @image.tags.include? @tag
      render json: { error: '409 conflict with existing record' }, status: 409
    elsif @image.tags << @tag
      @image_tag = @image.image_tags.find_by image_id: @image.id, tag_id: @tag.id
      render json: @image_tag, status: 200
    else
      render json: { error: '400 bad request' }, status: 400
    end
  end

  def destroy
    @image = ImageTag.find params[:id]

    if @image.delete
      render json: @image
    else
      render json: { error: '400 bad request' }, status: 400
    end
  end

  private

    def image_tag_params
      params.require(:image_tag).permit(:image_id, :tag_id)
    end

    def record_not_found
      render json: { error: '404 image tag join record not found' }, status: 404
    end
end
