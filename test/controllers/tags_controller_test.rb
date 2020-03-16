require 'test_helper'

class TagsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @valid_user = users :valid_user
  end

  def filter_attrs(tag)
    tag.attributes.filter {  |k, v| ['id', 'label', 'value'].include? k }
  end

  test 'index tags' do
    get api_tags_url

    tags = Tag.all.map(&method(:filter_attrs))

    assert_equal @response.body, tags.to_json
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

    assert_equal @response.body, filter_attrs(new_tag).to_json
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
end
