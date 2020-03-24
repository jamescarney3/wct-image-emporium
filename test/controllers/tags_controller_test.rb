require 'test_helper'
require 'json'

class TagsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @valid_user = users :valid_user
    @alternate_valid_user = users :alternate_valid_user
    @valid_tag = tags :valid_tag
    @alternate_valid_tag = tags :alternate_valid_tag
    @valid_tag_no_admin = tags :valid_tag_no_admin
  end

  def filter_attrs(tag)
    tag.attributes.filter { |k, v| ['id', 'label', 'value'].include? k }
  end

  test 'index tags' do
    get api_tags_url

    tags = Tag.all.map(&method(:filter_attrs))

    assert_equal JSON.parse(@response.body), tags
    assert_response :success
  end

  test 'create new tag' do
    log_in! @valid_user
    prev_count = Tag.count
    tag_params = { value: 'foo', label: 'bar' }
    post api_tags_url, params: { tag: tag_params }
    assert_equal Tag.count, prev_count + 1

    new_tag = Tag.last
    assert_equal new_tag.label, tag_params[:label]
    assert_equal new_tag.value, tag_params[:value]

    assert_equal JSON.parse(@response.body), filter_attrs(new_tag)
    assert_response :success
  end

  test 'create tag without auth' do
    prev_count = Tag.count
    tag_params = { value: 'foo', label: 'bar' }

    post api_tags_url, params: { tag: tag_params }
    assert_equal Tag.count, prev_count
    assert_response 401
  end

  test 'create duplicate tag' do
    log_in! @valid_user
    prev_count = Tag.count
    tag_params = { value: Tag.first.value, label: Tag.first.label }

    post api_tags_url, params: { tag: tag_params }
    assert_equal Tag.count, prev_count
    assert_response 409
  end

  test 'create tag with invalid params' do
    log_in! @valid_user
    tag_params = { value: 'bar', label: 'foo' }

    post api_tags_url, params: { tag: omit(tag_params, :value) }
    assert_response 422

    post api_tags_url, params: { tag: omit(tag_params, :label) }
    assert_response 422

    post api_tags_url, params: { tag: replace(tag_params, { value: '' }) }
    assert_response 422

    post api_tags_url, params: { tag: replace(tag_params, { label: '' }) }
    assert_response 422
  end

  test 'destroy tag belonging to logged in user' do
    log_in! @valid_user
    delete api_tag_url(@valid_tag.id)

    assert_not Tag.exists?(@valid_tag.id)
    assert_equal JSON.parse(@response.body), filter_attrs(@valid_tag)
    assert_response 200
  end

  test 'destroy tag belonging to another user' do
    log_in! @alternate_valid_user
    delete api_tag_url(@valid_tag.id)

    assert Tag.exists?(@valid_tag.id)
    assert_response 403
  end

  test 'destroy tag belonging to no user' do
    log_in! @valid_user
    delete api_tag_url(@valid_tag_no_admin.id)

    assert_not Tag.exists?(@valid_tag_no_admin.id)
    assert_equal JSON.parse(@response.body), filter_attrs(@valid_tag_no_admin)
    assert_response 200
  end

  test 'destroy tag when not logged in' do
    delete api_tag_url(@valid_tag.id)

    assert Tag.exists?(@valid_tag.id)
    assert_response 401
  end

  test 'destroy nonexistent tag' do
    log_in! @valid_user
    tag_id = rand(42069)
    until not tags.pluck(:id).include? tag_id do
      tag_id = rand(42069)
    end
    prev_count = Tag.count

    delete api_tag_url(tag_id)
    assert_equal Tag.count, prev_count
    assert_response 404
  end

  test 'edit tag belonging to current user' do
    log_in! @valid_user
    get edit_api_tag_url(@valid_tag.id)

    assert_equal JSON.parse(@response.body), filter_attrs(@valid_tag)
    assert_response 200
  end

  test 'edit tag belonging to no user' do
    log_in! @valid_user
    get edit_api_tag_url(@valid_tag_no_admin)

    assert_equal JSON.parse(@response.body), filter_attrs(@valid_tag_no_admin)
    assert_response 200
  end

  test 'edit tag belonging to another user' do
    log_in! @valid_user
    get edit_api_tag_url(@alternate_valid_tag.id)

    assert_response 403
  end

  test 'edit nonexistent tag' do
    log_in! @valid_user
    tag_id = rand(42069)
    until not tags.pluck(:id).include? tag_id do
      tag_id = rand(42069)
    end

    get edit_api_tag_url(tag_id)
    assert_response 404
  end

  test 'edit tag when not logged in' do
    get edit_api_tag_url(@valid_tag.id)

    assert_response 401
  end

  test 'update tag belonging to current user with valid params' do
    log_in! @valid_user
    tag_params = { label: 'Taller Tatum', value: 'tallertatum' }
    put api_tag_url(@valid_tag.id), params: { tag: tag_params }
    updated_tag = Tag.find(@valid_tag.id)

    assert_equal updated_tag.label, tag_params[:label]
    assert_equal updated_tag.value, tag_params[:value]
    assert_equal JSON.parse(@response.body), filter_attrs(updated_tag)
    assert_response 200
  end

  test 'update tag belongning to current user with invalid params' do
    log_in! @valid_user
    tag_params = { label: '', value: '' }
    previous_attrs = filter_attrs(@valid_tag).symbolize_keys
    put api_tag_url(@valid_tag.id), params: { tag: tag_params }
    updated_tag = Tag.find(@valid_tag.id)

    assert_equal updated_tag.label, previous_attrs[:label]
    assert_equal updated_tag.value, previous_attrs[:value]
    assert_response 422
  end

  test 'update tag belonging to no user' do
    log_in! @valid_user
    tag_params = { label: 'Taller Tatum', value: 'tallertatum' }
    put api_tag_url(@valid_tag_no_admin.id), params: { tag: tag_params }
    updated_tag = Tag.find(@valid_tag_no_admin.id)

    assert_equal updated_tag.label, tag_params[:label]
    assert_equal updated_tag.value, tag_params[:value]
    assert_equal JSON.parse(@response.body), filter_attrs(updated_tag)
    assert_response 200
  end

  test 'update tag belonging to another user' do
    log_in! @valid_user
    tag_params = { label: 'Taller Tatum', value: 'tallertatum' }
    previous_attrs = filter_attrs(@alternate_valid_tag).symbolize_keys
    put api_tag_url(@alternate_valid_tag.id), params: { tag: tag_params }
    updated_tag = Tag.find(@alternate_valid_tag.id)

    assert_equal updated_tag.label, previous_attrs[:label]
    assert_equal updated_tag.value, previous_attrs[:value]
    assert_response 403
  end

  test 'update nonexistent tag' do
    log_in! @valid_user
    tag_id = rand(42069)
    until not tags.pluck(:id).include? tag_id do
      tag_id = rand(42069)
    end
    tag_params = { label: 'Taller Tatum', value: 'tallertatum' }
    put api_tag_url(tag_id), params: { tag: tag_params }

    assert_response 404
  end
end
