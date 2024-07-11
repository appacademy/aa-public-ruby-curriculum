const pokemonAPI = 'https://pokeapi.co/api/v2/pokemon/?offset=150&limit=150'

const pokemon = [];
fetch(pokemonAPI)
  .then(response => response.json())
  .then(data => pokemon.push(...data.results));

export const findMatches = function(wordToMatch, pokemon) {
  return pokemon.filter(poke => {
    // here we need to figure out if the poke matches 
    // what we are searching for
    // g = global, i = insensitive to case
    const regex = new RegExp(wordToMatch, 'gi');
    return poke.name.match(regex);
  });
};

export const displayMatches = function(){
  const matchArray = findMatches(this.value, pokemon);
  const html = matchArray.map(poke => {
    return `
      <li>
        <span class="name">${poke.name}</span>
      </li>
    `;
  }).join('');
  suggestions.innerHTML = html;
};

const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
