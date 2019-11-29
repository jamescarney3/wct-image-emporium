class Image < ApplicationRecord
  validates :title, uniqueness: true

  belongs_to :admin, class_name: :User, foreign_key: :user_id, optional: true
end
