class Tag < ApplicationRecord
  validates :label, presence: true, uniqueness: true
  validates :value, presence: true, uniqueness: true
  validates :admin, presence: true, on: :create

  belongs_to :admin, class_name: :User, foreign_key: :user_id, optional: true
end
