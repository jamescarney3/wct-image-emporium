require 'test_helper'

class TagTest < ActiveSupport::TestCase
  def setup
    @valid_user = users :valid_user
    @valid_tag = tags :valid_tag
    @valid_tag_no_admin = tags :valid_tag_no_admin
  end

  test 'instance should validate' do
    # validate valid fixutre instances, no playin
    assert @valid_tag.valid?
    assert @valid_tag_no_admin.valid?

    # use this as base case for constructor hash args, all valid, omit
    # undesired k/v pairs with omit helper
    tag_args = {
      value: 'smarf',
      label: 'Smarf',
      admin: @valid_user,
    }

    # field validation presence bad cases
    assert_not Tag.new(omit(tag_args, :value)).valid?
    assert_not Tag.new(replace(tag_args, value: '')).valid?

    assert_not Tag.new(omit(tag_args, :label)).valid?
    assert_not Tag.new(replace(tag_args, label: '')).valid?

    # field validation uniqueness bad cases
    assert_not Tag.new(replace(tag_args, value: @valid_tag.value)).valid?
    assert_not Tag.new(replace(tag_args, label: @valid_tag.label)).valid?
  end

  test 'instance should validate admin on create only' do
    tag = Tag.new(label: 'Smarf', value: 'smarf')
    assert tag.valid?(:new)
    assert_not tag.valid?(:create)
  end
end
