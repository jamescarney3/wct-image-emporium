class Image < ApplicationRecord
  validates :title, presence: true, uniqueness: true

  has_one_attached :asset

  belongs_to :admin, class_name: :User, foreign_key: :user_id, optional: true
end
