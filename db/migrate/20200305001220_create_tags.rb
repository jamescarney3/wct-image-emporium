class CreateTags < ActiveRecord::Migration[6.0]
  def change
    create_table :tags do |t|
      t.string :label, null: false, uniqueness: true
      t.string :value, null: false, uniqueness: true
      t.references :user, foreign_key: true

      t.timestamps
    end
  end
end
