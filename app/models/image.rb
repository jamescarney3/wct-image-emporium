class Image < ApplicationRecord
  validates :title, presence: true, uniqueness: true
  validate :asset_must_be_attached

  has_one_attached :asset

  belongs_to :admin, class_name: :User, foreign_key: :user_id, optional: true
  has_many :image_tags, dependent: :destroy
  has_many :tags, through: :image_tags

  scope :for_user, lambda { |user| where(admin: user) }
  scope :with_tags, lambda { |*tag_ids| find_by_sql generate_tags_query(*tag_ids) }

  private

    def asset_must_be_attached
      if not asset.attached?
        errors.add :asset, 'must be attached'
      end
    end

    def self.generate_tags_query(*ids)
      "
        SELECT * FROM images
        INNER JOIN (
          SELECT s1images.id, count(s1tags) FROM images AS s1images
          INNER JOIN image_tags ON s1images.id = image_tags.image_id
          INNER JOIN tags AS s1tags ON image_tags.tag_id = s1tags.id
          WHERE s1tags.id IN (#{ids.join(',')}) GROUP BY s1images.id
        ) AS matched_images ON images.id = matched_images.id
        WHERE count = #{ids.count};
      "
    end
end
