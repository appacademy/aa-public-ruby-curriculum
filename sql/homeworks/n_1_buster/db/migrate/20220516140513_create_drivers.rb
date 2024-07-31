class CreateDrivers < ActiveRecord::Migration[7.0]
  def change
    create_table :drivers do |t|
      t.string :name, null: false
      t.references :bus, null: false, foreign_key: true

      t.timestamps
    end
  end
end
