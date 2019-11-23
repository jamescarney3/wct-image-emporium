require 'test_helper'

OmniAuth.config.test_mode = true

class SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should log in valid uid user and redirect to root with true auth param' do
    uid = 12345
    ADMIN_IDS << uid

    OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
      provider: 'twitter',
      uid: uid,
    })

    get auth_callback_url(provider: 'twitter')
    assert_redirected_to :admin
  end

  test 'should redirect to root with false auth param for invalid uid user' do
    uid = rand(10000..99999)
    until not ADMIN_IDS.include? uid do
      uid = rand(10000..99999)
    end

    OmniAuth.config.mock_auth[:twitter] = OmniAuth::AuthHash.new({
      provider: 'twitter',
      uid: uid,
    })

    get auth_callback_path(provider: 'twitter')
    assert_redirected_to :unauthorized
  end

  test 'should redirect to auth failure route on failed oauth callback' do
    failure_message = :invalid_credentials
    OmniAuth.config.mock_auth[:twitter] = failure_message

    silence_omniauth { get auth_callback_path(provider: 'twitter') }
    assert_redirected_to auth_failure_path(message: failure_message, strategy: 'twitter')
  end

  test 'should sign in and return an existing user by cookie session token' do
    uid = 66642069
    ADMIN_IDS << uid
    user = User.create(uid: uid)
    cookies['session_token'] = user.session_token

    get auth_sessions_path
    assert_equal JSON.parse(@response.body)['uid'], user.uid
  end

  test 'should not sign in and return a user with an invalid cookie session token' do
    uid = 66642069
    ADMIN_IDS << uid
    user = User.create(uid: uid)
    cookies['session_token'] = user.session_token + 'smarf'

    get auth_sessions_path
    assert JSON.parse(@response.body).empty?
  end
end
