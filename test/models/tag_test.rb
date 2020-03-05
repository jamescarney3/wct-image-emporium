require 'test_helper'

class TagTest < ActiveSupport::TestCase
  def setup
    @valid_tag = tags :valid_tag
  end

  test 'instance should validate' do
    assert @valid_tag.valid?
    assert_not Tag.new(label: 'Smarf').valid?
    assert_not Tag.new(value: 'smarf').valid?
    assert_not Tag.new(label: 'Smarf', value: '').valid?
    assert_not Tag.new(label: '', value: 'smarf').valid?
  end
end
