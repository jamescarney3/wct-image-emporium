require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup
    @invalid_user = users :invalid_user # uid 42069
    @valid_user = users :valid_user
  end

  test 'instance should validate' do
    assert_not @invalid_user.valid? 'default invalid user instance is not valid'
    assert @valid_user.valid? 'default valid user instance is valid'

    duplicate_user = User.new
    duplicate_user.uid = @valid_user.uid
    assert_not duplicate_user.valid? 'user instance with duplicate uid is not valid'
  end

  test 'instance should ensure session token' do
    assert_not @valid_user.session_token.nil?
  end

  test 'reset_token! does' do
    original_token = @valid_user.session_token
    @valid_user.reset_token!
    reset_token = @valid_user.session_token
    assert_not_equal original_token, reset_token
  end

  test 'self#generate_session_token generates non-conflicting token' do
    tokens = User.pluck :session_token
    new_token = User.generate_session_token
    assert new_token
    assert_not tokens.include? new_token
  end

  test 'self#create_from_uid creates valid user' do
    new_uid = 12345
    ADMIN_IDS << new_uid
    user = User.create_from_uid new_uid
    assert_not user.nil?
  end

  test 'self#from_uid returns existing user' do
    user = User.from_uid @valid_user.uid
    assert_not user.nil?
  end

  test 'self#from_uid returns created user' do
    new_uid = 666420
    ADMIN_IDS << new_uid
    user = User.from_uid(new_uid)
    assert_not user.nil?
  end
end
