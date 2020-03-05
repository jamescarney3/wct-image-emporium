class CreateImageTags < ActiveRecord::Migration[6.0]
  def change
    create_table :image_tags do |t|
      t.references :image, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
    end
  end
end
