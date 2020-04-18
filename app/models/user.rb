class User < ApplicationRecord
  validates :uid, presence: true, uniqueness: true

  after_initialize :ensure_session_token
  serialize :historical_screen_names, Array

  # generate new token, set on user, save user, and return token
  def reset_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  def self.from_auth(uid:, screen_name:)
    user = User.find_by(uid: uid)
    user.refresh_screen_name(screen_name) if !user.nil?
    user || create_from_auth(uid: uid, screen_name: screen_name)
  end

  def self.create_from_auth(uid:, screen_name:)
    create(uid: uid, screen_name: screen_name) if ADMIN_IDS.include? uid
  end

  def refresh_screen_name(new_screen_name)
    if screen_name.downcase != new_screen_name.downcase
      self.historical_screen_names = historical_screen_names.concat([screen_name]).uniq.compact
      self.screen_name = new_screen_name
    end
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
