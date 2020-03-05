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

  # return a new hash with k/v pairs omitted where key is in collected args
  def omit(hash, *keys)
    hash.select { |k| not keys.include?(k) }
  end

  # return a new hash with k/v pairs overwritten by collected kwargs
  def replace(hash, **keyvals)
    hash.map { |k, v| [k, keyvals.include?(k) ? keyvals[k] : v] }.to_h
  end

  # need to log in a user? log in the user with this
  def log_in!(user)
    cookies[:session_token] = user.reset_token!
  end
end
