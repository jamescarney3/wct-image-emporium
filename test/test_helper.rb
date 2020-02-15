ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'

class ActiveSupport::TestCase
  # Run tests in parallel with specified workers
  parallelize(workers: :number_of_processors)

  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def silence_omniauth
    previous_logger = OmniAuth.config.logger
    OmniAuth.config.logger = Logger.new("/dev/null")
    yield
  ensure
    OmniAuth.config.logger = previous_logger
  end

  # need to log in a user? log in the user with this
  def log_in!(user)
    cookies[:session_token] = user.reset_token!
  end

  # make sure we don't leave any assets in tmp/storage after test runs
  def after_teardown
    super
    FileUtils.rm_rf(Rails.root.join('tmp', 'storage'))
  end
end
