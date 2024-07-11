import React from "react";

class PokemonForm extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      name: "",
      attack: "",
      defense: "",
      poke_type: "bug",
      image_url: "",
      move_1: "",
      move_2: "" 
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.createPokemon(this.state)
    .then(pokemon => 
      this.props.history.push(`/pokemon/${pokemon.id}`));
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value });
  }

  errors() {
    return this.props.errors.map(error => {
    return (
    <li className="error" key={error}>
      {error}
    </li>
    );
  });
  }

  render(){
    return (
    <section className="pokemon-detail">
      <img src={window.images.pokeLogo} alt="Copyright of Nintendo Pokemon" />
      <ul>{this.errors()}</ul>
      <form className="pokemon-form" onSubmit={this.handleSubmit}>

        <input
          type="text"
          value={this.state.name}
          placeholder="Name"
          onChange={this.update("name")}
        />

        <input
          type="text"
          value={this.state.image_url}
          placeholder="Image Url"
          onChange={this.update("image_url")}
        />

        <select
          value={this.state.type}
          onChange={this.update("poke_type")}
          defaultValue="Select Pokemon Type"
        >
        {POKEMON_TYPES.map((type, i) => {
          return (
          <option value={type} key={i}>
          {type}
          </option>
          );
        })}
        </select>

        <input
          type="number"
          value={this.state.attack}
          placeholder="Attack"
          onChange={this.update("attack")}
        />

        <input
          type="number"
          value={this.state.defense}
          placeholder="Defense"
          onChange={this.update("defense")}
        />

        <input
          type="text"
          value={this.state.move_1}
          placeholder="Move 1"
          onChange={this.update("move_1")}
        />

        <input
          type="text"
          value={this.state.move_2}
          placeholder="Move 2"
          onChange={this.update("move_2")}
        />

        <button>Create Pokemon</button>

      </form>
    </section>
    );
  }
}

export default PokemonForm;