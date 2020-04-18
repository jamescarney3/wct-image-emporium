class AddHandlesToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :screen_name, :string
    add_column :users, :historical_screen_names, :string
  end
end
