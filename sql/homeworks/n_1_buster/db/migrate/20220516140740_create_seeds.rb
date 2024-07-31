class CreateSeeds < ActiveRecord::Migration[7.0]
  def change
    create_table :seeds do |t|
      t.integer :count, null: false
      t.references :plant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
