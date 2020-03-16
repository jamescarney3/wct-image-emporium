require 'test_helper'

class TagsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @valid_user = users :valid_user
  end

  # filter tag attrs to align with intended json representation
  # this logic might get smeared across the stack initially - it'll have to be
  # implemented in jbuilder views which... maybe there's a cleaner way but I
  # don't know what it is yet
  filter_attrs = proc { |tag| tag.attributes.filter {  |k, v| ['id', 'label', 'value'].include? k } }

  test '#index tags' do
    get api_tags_url

    tags = Tag.all.map(&filter_attrs)

    assert_equal @response.body, tags.to_json
    assert_response :success
  end

  test '#create new tag' do
    log_in! @valid_user
    prev_count = Tag.count
    tag_params = { value: 'foo', label: 'bar' }
    post api_tags_url, params: { tag: tag_params }
    assert_equal Tag.count, prev_count + 1

    new_tag = Tag.last
    assert_equal new_tag.label, tag_params[:label]
    assert_equal new_tag.value, tag_params[:value]

    assert_equal @response.body, filter_attrs.call(new_tag)
    assert_response :success
  end

  test '#create tag without auth' do
    prev_count = Tag.count
    tag_params = { value: 'foo', label: 'bar' }

    post api_tags_url, params: { tag: tag_params }
    assert_equal Tag.count, prev_count
    assert_response 401
  end

  test '#create duplicate tag' do
    log_in! @valid_user
    prev_count = Tag.count
    tag_params = { value: Tag.first.value, label: Tag.first.label }

    post api_tags_url, params: { tag: tag_params }
    assert_equal Tag.count, prev_count
    assert_response 409
  end
end
