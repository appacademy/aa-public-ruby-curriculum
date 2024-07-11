class CreatePokeMoves < ActiveRecord::Migration[5.2]
  def change
    create_table :poke_moves do |t|
      t.integer :move_id, index: {}
      t.integer :pokemon_id, index: {}
      t.timestamps
    end
  end
end
