class CreateAlbums < ActiveRecord::Migration[7.0]
  def change
    create_table :albums do |t|
      t.string :title, null: false
      t.references :band, null: false, foreign_key: true, index: false
      t.integer :year, null: false
      t.boolean :live, null: false, default: false

      t.timestamps
    end
    add_index :albums, %i(band_id title), unique: true
  end
end
