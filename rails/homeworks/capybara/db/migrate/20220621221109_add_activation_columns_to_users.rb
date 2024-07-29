class AddActivationColumnsToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :activated, :boolean, null: false, default: false
    add_column :users, :activation_token, :string, null: false
    add_index :users, :activation_token, unique: true
  end
end
