class CreateImages < ActiveRecord::Migration[6.0]
  def change
    create_table :images do |t|
      t.references :user, foreign_key: true, null: true
      t.string :title, null: false

      t.timestamps
    end
  end
end
