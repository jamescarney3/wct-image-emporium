class Api::ImageTagsController < ApplicationController
  before_action :require_logged_in

  def create
  end

  def destroy
  end

  private

    def image_tag_params
      params.require(:image_tag).permit(:image_id, :tag_id)
    end
end
