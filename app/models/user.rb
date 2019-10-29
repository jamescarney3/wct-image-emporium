class User < ApplicationRecord
  validates :uid, presence: true, uniqueness: true

  after_initialize :ensure_session_token

  # generate new token, set on user, save user, and return token
  def reset_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  # find or create user from Twitter auth
  def self.from_twitter(auth)
    where(auth.slice('uid')).first || create_from_twitter(auth)
  end

  # get uid from auth data and create a new user if it's whitelisted
  def self.create_from_twitter(auth)
    uid = auth.slice('uid')
    create(auth.slice('uid')) if ADMIN_IDS.include? uid
  end

  def self.generate_session_token
    # generate a token
    new_token = SecureRandom.urlsafe_base64(16)
    # make sure it's not already in use
    old_tokens = User.pluck(:session_token)
    until !old_tokens.include?(new_token) # lol un-scalable
      new_token = SecureRandom.urlsafe_base64(16)
    end
    # return non-conflicting token
    new_token
  end

  private

  # true if the instance has one, generate one if not
  def ensure_session_token
    self.session_token ||= User.generate_session_token
  end
end
