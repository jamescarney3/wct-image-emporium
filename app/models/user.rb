class User < ApplicationRecord
  validates :uid, presence: true, uniqueness: true

  after_initialize :ensure_session_token

  # generate new token, set on user, save user, and return token
  def reset_token!
    self.session_token = User.generate_session_token
    self.save!
    self.session_token
  end

  # find or create a user from a twitter uid
  def self.from_uid(uid)
    where uid: uid || create_from_uid(uid)
  end

  # create a user with a a twitter uid
  def self.create_from_uid(uid)
    create(uid: uid) if ADMIN_IDS.include? uid
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
