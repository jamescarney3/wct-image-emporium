require 'test_helper'

class TagTest < ActiveSupport::TestCase
  def setup
    @valid_user = users :valid_user
    @valid_tag = tags :valid_tag
    @valid_tag_no_admin = tags :valid_tag_no_admin
  end

  test 'instance should validate' do
    assert @valid_tag.valid?
    assert @valid_tag_no_admin.valid?

    assert_not Tag.create(label: 'Smarf', value: 'smarf').valid?

    assert_not Tag.new(label: @valid_tag.label, value: 'shaqtin').valid?
    assert_not Tag.new(label: 'Shaqtin', value: @valid_tag.value).valid?
    assert_not Tag.new(label: 'Smarf').valid?
    assert_not Tag.new(value: 'smarf').valid?
    assert_not Tag.new(label: 'Smarf', value: '').valid?
    assert_not Tag.new(label: '', value: 'smarf').valid?
  end
end
