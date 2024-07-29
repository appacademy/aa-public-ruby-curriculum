class CreateTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.references :album, null: false, foreign_key: true, index: false
      t.integer :ord, null: false
      t.boolean :bonus, null: false, default: false
      t.text :lyrics

      t.timestamps
    end
    add_index :tracks, %i(album_id ord), unique: true
  end
end
