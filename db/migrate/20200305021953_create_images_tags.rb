class CreateImagesTags < ActiveRecord::Migration[6.0]
  def change
    create_table :images_tags do |t|
      t.references :image, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
    end
  end
end
