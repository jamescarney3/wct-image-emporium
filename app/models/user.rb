class User < ApplicationRecord
  def self.from_twitter(auth)
    where(auth.slice('uid')).first || create_from_twitter(auth)
  end

  def self.create_from_twitter(auth)
    create(auth.slice('uid'))
  end
end
