class Image < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validate :asset_must_be_attached

  has_one_attached :asset

  belongs_to :admin, class_name: :User, foreign_key: :user_id, optional: true


  def asset_must_be_attached
    if not asset.attached?
      errors.add :asset, 'must be attached'
    end
  end
end
