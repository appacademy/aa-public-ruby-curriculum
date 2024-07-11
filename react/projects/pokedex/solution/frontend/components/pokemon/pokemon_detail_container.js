import {connect} from 'react-redux';
import {requestSinglePokemon} from './../../actions/pokemon_actions';
import PokemonDetail from './pokemon_detail';
import { selectPokemonMovesNames } from './../../reducers/selectors';

const mapStateToProps = (state, ownProps) => {
  return {
    pokemon: state.entities.pokemon[ownProps.match.params.pokemonId],
    moves: selectPokemonMovesNames(state),
    items: Object.values(state.entities.items),
    loading: state.ui.loading.detailLoading
  }
}


const mapDispatchToProps = (dispatch) => {
  return{
    requestSinglePokemon: (pokemonId) => dispatch(requestSinglePokemon(pokemonId)) 
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PokemonDetail)