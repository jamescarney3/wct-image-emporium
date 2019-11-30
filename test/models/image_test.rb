require 'test_helper'

class ImageTest < ActiveSupport::TestCase
  def setup
    @valid_image = images :valid_image
    @no_admin_image = images :no_admin_image
  end

  test 'instance_should_validate' do
    assert @valid_image.valid?
    assert @no_admin_image.valid?

    duplicate_title_image = Image.new(title: @valid_image.title)
    assert_not duplicate_title_image.valid?

    no_title_image = Image.new
    assert_not no_title_image.valid?
  end

  test 'can initialize with an active storage record' do
    # see fixtures/images, if not implement here
    skip
  end

  test 'can attach an active storage record' do
    # @valid_image.asset.attach(io: File('<some location in test/fixtures/files?>'))
    # file = <read the same file>
    # assert <they match>
    skip
  end

  # THIS BELONGS ON THE USER MODEL
  # test 'persists if associated admin user record is deleted' do
  #   @valid_image.admin.destroy
  #   persisted_image = Image.find(@valid_image.id)
  #
  #   assert_not persisted_image.nil?
  # end
end
