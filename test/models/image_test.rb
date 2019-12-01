require 'test_helper'
require 'fileutils'

# tests for successful initialization with an image asset and persistence if
# and associated admin record is destroyed aren't implemented here even though
# it seems like they could be because those functionalities are ultimately the
# responsibilities of ActiveStorage and the User model unit tests respectively

# see additional notes on what ActiveStorag is doin under the hood here:
# https://evilmartians.com/chronicles/rails-5-2-active-storage-and-beyond

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

  test 'can attach an active storage record' do
    file = file_fixture('hoopball.jpg')
    @valid_image.asset.attach(io: file.open, filename: 'HOOPBALL.jpg')
    @valid_image.asset.open do |attached_file|
      assert FileUtils.compare_file(file, attached_file)
    end
  end
end
