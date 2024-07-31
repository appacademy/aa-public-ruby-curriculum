class CreateGardeners < ActiveRecord::Migration[7.0]
  def change
    create_table :gardeners do |t|
      t.string :name, null: false
      t.references :house, null: false, foreign_key: true

      t.timestamps
    end
  end
end
