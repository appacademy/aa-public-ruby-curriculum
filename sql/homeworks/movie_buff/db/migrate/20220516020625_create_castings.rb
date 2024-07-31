class CreateCastings < ActiveRecord::Migration[7.0]
  def change
    create_table :castings do |t|
      t.references :actor, null: false, foreign_key: true, index: false
      t.references :movie, null: false, foreign_key: true
      t.integer :ord, null: false

      t.timestamps
    end
    add_index :castings, %i(actor_id movie_id), unique: true
  end
end
