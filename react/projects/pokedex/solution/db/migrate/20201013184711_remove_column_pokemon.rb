class RemoveColumnPokemon < ActiveRecord::Migration[5.2]
  def change
    remove_column :pokemons, :moves
  end
end
