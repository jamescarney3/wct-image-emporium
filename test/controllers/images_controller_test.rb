require 'test_helper'

class ImagesControllerTest < ActionDispatch::IntegrationTest
  def setup
    @valid_image = images :valid_image
    @no_admin_image = images :no_admin_image
    @valid_user = users :valid_user
  end

  test 'index' do
    get api_images_path

    response_json = [
      {
        title: @valid_image.title,
        user_id: @valid_image.admin.id,
        url: @valid_image.asset.attached? ? rails_blob_url(@valid_image.asset) : nil,
      },
      {
        title: @no_admin_image.title,
        user_id: nil,
        url: @no_admin_image.asset.attached? ? rails_blob_url(@no_admin_image.asset) : nil,
      },
    ]

    assert_equal response_json, JSON.parse(@response.body).map(&:symbolize_keys)
    assert_response :success
  end

  test '#show existing image with admin' do
    # call get with id param matching a valid fixture image
    get api_image_path @valid_image.id

    response_hash = {
      title: @valid_image.title,
      user_id: @valid_image.admin.id,
      url: @valid_image.asset.attached? ? rails_blob_url(@valid_image.asset) : nil,
      tags: @valid_image.tags.map { |tag| tag.attributes.filter { |k, v| [:id, :value, :label] } }
    }

    assert_equal response_hash, JSON.parse(@response.body).symbolize_keys
    assert_response :success
  end

  test '#show existing image without admin' do
    get api_image_path @no_admin_image.id

    response_hash = {
      title: @no_admin_image.title,
      user_id: nil,
      url: @no_admin_image.asset.attached? ? rails_blob_url(@no_admin_image.asset) : nil,
      tags: @no_admin_image.tags.map { |tag| tag.attributes.filter { |k, v| [:id, :value, :label] } }
    }

    assert_equal response_hash, JSON.parse(@response.body).symbolize_keys
    assert_response :success
  end

  test '#show nonexistent image' do
    # generate an image id that doesn't match any existing images
    image_id = rand(42069)
    until not images.pluck(:id).include? image_id do
      image_id = rand(42069)
    end

    get api_image_path image_id
    assert_response :missing
  end

  test '#create image record for logged in user and valid params' do
    log_in!(@valid_user)
    asset = fixture_file_upload('files/hoopball.jpg', 'image/jpg')
    post api_images_path, params: { image: { title: 'erotic city', asset: asset } }

    response_hash = {
      title: 'erotic city',
      user_id: @valid_user.id,
      url: Image.last.asset.attached? ? rails_blob_url(Image.last.asset) : nil,
      tags: [],
    }

    assert_equal response_hash, JSON.parse(@response.body).symbolize_keys
    assert_response :success
  end

  test '#create image record when user not logged in' do
    asset = fixture_file_upload('files/hoopball.jpg', 'image/jpg')
    post api_images_path, params: { image: { title: 'erotic city', asset: asset } }

    assert_response 401
  end

  test '#create image record for logged in user with no title' do
    log_in!(@valid_user)
    asset = fixture_file_upload('files/hoopball.jpg', 'image/jpg')
    post api_images_path, params: { image: { asset: asset } }

    assert_response 422
  end

  test '#create image record for logged in user with no asset' do
    log_in!(@valid_user)
    post api_images_path, params: { image: { title: 'erotic city' } }

    assert_response 422
  end
end
