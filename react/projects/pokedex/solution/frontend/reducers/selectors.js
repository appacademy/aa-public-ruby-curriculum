export const selectAllPokemon = (state) => {
  return Object.values(state.entities.pokemon)
}


export const selectPokemonMovesNames = (state) => {
  const moveNames = Object.values(state.entities.moves).map(move=> {
    return move.name;
  })
  return moveNames;
}