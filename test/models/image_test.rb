require 'test_helper'
require 'fileutils'

# tests for persistence if and associated admin record is destroyed aren't
# implemented here even though it seems like they could be because those
# functionalities are ultimately the responsibilities the User model unit
# tests

# see additional notes on what ActiveStorage is doing under the hood here:
# https://evilmartians.com/chronicles/rails-5-2-active-storage-and-beyond

class ImageTest < ActiveSupport::TestCase
  def setup
    @valid_image = images :valid_image
    @no_admin_image = images :no_admin_image
    @valid_user = users :valid_user

    @valid_image.asset.attach(io: file_fixture('hoopball.jpg').open, filename: 'HOOPBALL.jpg')
    @no_admin_image.asset.attach(io: file_fixture('hoopball.jpg').open, filename: 'HOOPBALL.jpg')
  end

  test 'instance_should_validate' do
    assert @valid_image.valid?
    assert @no_admin_image.valid?


    asset = { io: file_fixture('hoopball.jpg').open, filename: 'HOOPBALL.jpg' }

    duplicate_title_image = Image.new(title: @valid_image.title, asset: asset)
    assert_not duplicate_title_image.valid?

    no_title_image = Image.new(asset: asset)
    assert_not no_title_image.valid?

    no_asset_image = Image.new(title: 'kentavious_balled_well_nope.jpg')
    assert_not no_asset_image.valid?
  end

  test 'can initialize with attached image asset' do
    file = file_fixture('hoopball.jpg')
    new_image = Image.create(admin: @valid_user, title: 'da hoopball', asset: { io: file.open, filename: 'HOOPBALL.jpg' })

    assert_not new_image.nil?
    assert new_image.asset.attached?
    new_image.asset.open do |attached_file|
      assert FileUtils.compare_file(file, attached_file)
    end
  end

  test 'can attach an active storage record' do
    file = file_fixture('hoopball.jpg')
    @valid_image.asset.attach(io: file.open, filename: 'HOOPBALL.jpg')

    assert @valid_image.asset.attached?
    @valid_image.asset.open do |attached_file|
      assert FileUtils.compare_file(file, attached_file)
    end
  end
end
