require 'test_helper'

class ImageTagsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @valid_user = users :valid_user
    @valid_image = images :valid_image
    @valid_tag = tags :valid_tag
  end

  test 'create new image tag join' do

  end

  test 'create duplicate image tag join' do

  end

  test 'create image tag join while not logged in' do
  end
end
