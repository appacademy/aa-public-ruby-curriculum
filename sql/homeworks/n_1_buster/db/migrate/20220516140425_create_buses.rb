class CreateBuses < ActiveRecord::Migration[7.0]
  def change
    create_table :buses do |t|
      t.string :model, null: false
      t.references :route, null: false, foreign_key: true

      t.timestamps
    end
  end
end
