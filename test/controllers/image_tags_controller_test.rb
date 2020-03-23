require 'test_helper'

class ImageTagsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @valid_user = users :valid_user
    @valid_image = images :valid_image
    @valid_tag = tags :valid_tag
  end

  test 'create new image tag join' do
    log_in! @valid_user
    image_tag_params = { image_id: @valid_image.id, tag_id: @valid_tag.id }

    post api_image_tags_url, params: { image_tag: image_tag_params }

    assert @valid_image.tags.include? @valid_tag
    @image_tag = ImageTag.find_by image_id: @valid_image.id, tag_id: @valid_tag.id

    assert_equal @response.body, @image_tag.to_json
    assert_response 200
  end

  test 'create duplicate image tag join' do
    log_in! @valid_user
    @valid_image.tags << @valid_tag
    image_tag_params = { image_id: @valid_image.id, tag_id: @valid_tag.id }

    post api_image_tags_url, params: { image_tag: image_tag_params }

    assert @valid_image.tags.include? @valid_tag
    assert_response 409
  end

  test 'create image tag join while not logged in' do
    image_tag_params = { image_id: @valid_image.id, tag_id: @valid_tag.id }

    post api_image_tags_url, params: { image_tag: image_tag_params }

    assert_not @valid_image.tags.include? @valid_tag
    assert_response 401
  end

  test 'delete image tag join' do
    log_in! @valid_user
    @valid_image.tags << @valid_tag
    @image_tag = @valid_image.image_tags.find_by image_id: @valid_image.id, tag_id: @valid_tag.id

    delete api_image_tag_url id: @image_tag.id

    assert_equal @response.body, @image_tag.to_json
    assert_response 200
  end

  test 'delete nonexistent image tag join' do
    log_in! @valid_user

    image_tag_id = rand(42069)
    until not ImageTag.pluck(:id).include? image_tag_id do
      image_tag_id = rand(42069)
    end

    delete api_image_tag_path image_tag_id

    assert_response 404
  end

  test 'delete image tag join while not logged in' do
    @valid_image.tags << @valid_tag
    @image_tag = @valid_image.image_tags.find_by image_id: @valid_image.id, tag_id: @valid_tag.id

    delete api_image_tag_url id: @image_tag.id

    assert_response 401
  end
end
