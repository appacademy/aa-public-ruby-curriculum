import React from 'react';
import PokemonIndexItem from './pokemon_index_item';
import {Route} from 'react-router-dom';
import PokemonDetailContainer from './pokemon_detail_container';
import PokemonFormContainer from './pokemon_form_container';
import LoadingIcon from './loading_icon';



class PokemonIndex extends React.Component{
  constructor(props){
  super(props)
  }

  componentDidMount(){
  this.props.requestAllPokemon()
  }
  
  render(){
    if (this.props.loading) { return <LoadingIcon />; }
    return (
      <section className="pokedex">
        <Route exact path="/" component={PokemonFormContainer} />
        <Route path="/pokemon/:pokemonId" component={PokemonDetailContainer}/>
        <ul>
          {this.props.pokemon.map((poke) => (
          <PokemonIndexItem key={poke.id} pokemon={poke}/>))
          }
        </ul>
      </section>
    )
  }
}



export default PokemonIndex;