class CreateCountries < ActiveRecord::Migration
  def change
    create_table :countries do |t|
      t.string :name, null: false

      t.timestamps
    end

    add_column :users, :country_id, :integer, null: false
    add_index :users, :country_id
  end
end
