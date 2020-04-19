class Image < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validate :asset_must_be_attached

  has_one_attached :asset

  belongs_to :admin, class_name: :User, foreign_key: :user_id, optional: true
  has_many :image_tags, dependent: :destroy
  has_many :tags, through: :image_tags

  scope :for_user, lambda { |user| where admin: user }
  scope :with_tags, lambda { |*tag_ids| where id: Image.get_ids_for_tags(*tag_ids) }

  private

    def asset_must_be_attached
      if not asset.attached?
        errors.add :asset, 'must be attached'
      end
    end

    def self.get_ids_for_tags(*tag_ids)
      Image.joins(image_tags: :tag).where(tags: { id: tag_ids }).group(:id).count.select {
        |k, v| v == tag_ids.count
      }.keys
    end
end
