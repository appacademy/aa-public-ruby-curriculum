class CreatePlants < ActiveRecord::Migration[7.0]
  def change
    create_table :plants do |t|
      t.string :species, null: false
      t.references :gardener, null: false, foreign_key: true

      t.timestamps
    end
  end
end
