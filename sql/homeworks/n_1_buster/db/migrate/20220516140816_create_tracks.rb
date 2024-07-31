class CreateTracks < ActiveRecord::Migration[7.0]
  def change
    create_table :tracks do |t|
      t.string :title, null: false
      t.references :album, null: false, foreign_key: true

      t.timestamps
    end
  end
end
