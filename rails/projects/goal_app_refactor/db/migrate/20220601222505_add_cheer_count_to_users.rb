class AddCheerCountToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :cheer_count, :integer, null: false, default: 12
  end
end
