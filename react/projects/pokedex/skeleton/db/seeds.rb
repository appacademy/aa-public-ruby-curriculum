# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

def candidate_item 
  %w(
    /assets/pokemon_berry.svg
    /assets/pokemon_egg.svg
    /assets/pokemon_potion.svg
    /assets/pokemon_super_potion.svg
  ).sample
end

def find_unique_item(pokemon) 
  candidate = candidate_item()
  while Pokemon.find(pokemon.id).items.any?{|item| item.image_url == candidate}
    candidate = candidate_item()
  end
  return candidate
end



def create_random_item!(pokemon)
  Item.create!(
    pokemon_id: pokemon.id,
    name: Faker::Commerce.product_name,
    price: (1..100).to_a.sample,
    happiness: (1..100).to_a.sample,
    image_url: find_unique_item(pokemon)
  )
end



ActiveRecord::Base.transaction do
  
  PokeMove.destroy_all
  PokeMove.reset_pk_sequence
  Move.destroy_all
  Move.reset_pk_sequence
  Pokemon.destroy_all
  Pokemon.reset_pk_sequence
  Item.destroy_all
  Item.reset_pk_sequence
 

  pokemon = {
    '1' => {
      'name' => 'Bulbasaur',
      'attack' => 49,
      'defense' => 49,
      'poke_type' => 'grass',
      'moves' => [
         'tackle',
         'vine whip'
      ],
    },
    '2' => {
      'name' => 'Ivysaur',
      'attack' => 62,
      'defense' => 63,
      'poke_type' => 'grass',
      'moves' => [
         'tackle',
         'vine whip',
         'razor leaf'
      ],
    },
    '3' => {
      'name' => 'Venusaur',
      'attack' => 82,
      'defense' => 83,
      'poke_type' => 'grass',
      'moves' => [
         'tackle',
         'vine whip',
         'razor leaf'
      ],
    },
    '4' => {
      'name' => 'Charmander',
      'attack' => 52,
      'defense' => 43,
      'poke_type' => 'fire',
      'moves' => [
         'scratch',
         'ember',
         'metal claw'
      ],
    },
    '5' => {
      'name' => 'Charmeleon',
      'attack' => 64,
      'defense' => 58,
      'poke_type' => 'fire',
      'moves' => [
         'scratch',
         'ember',
         'metal claw',
         'flamethrower'
      ],
    },
    '6' => {
      'name' => 'Charizard',
      'attack' => 84,
      'defense' => 78,
      'poke_type' => 'fire',
      'moves' => [
         'flamethrower',
         'wing attack',
         'slash',
         'metal claw'
      ],
    },
    '7' => {
      'name' => 'Squirtle',
      'attack' => 48,
      'defense' => 65,
      'poke_type' => 'water',
      'moves' => [
         'tackle',
         'bubble',
         'water gun'
      ],
    },
    '8' => {
      'name' => 'Wartortle',
      'attack' => 63,
      'defense' => 80,
      'poke_type' => 'water',
      'moves' => [
         'tackle',
         'bubble',
         'water gun',
         'bite'
      ],
    },
    '9' => {
      'name' => 'Blastoise',
      'attack' => 83,
      'defense' => 100,
      'poke_type' => 'water',
      'moves' => [
         'hydro pump',
         'bubble',
         'water gun',
         'bite'
      ],
    },
    '10' => {
      'name' => 'Caterpie',
      'attack' => 30,
      'defense' => 35,
      'poke_type' => 'bug',
      'moves' => [
         'tackle'
      ],
    },
    '11' => {
      'name' => 'Butterfree',
      'attack' => 45,
      'defense' => 50,
      'poke_type' => 'bug',
      'moves' => [
         'confusion',
         'gust',
         'psybeam',
         'silver wind'
      ],
    },
    '12' => {
      'name' => 'Weedle',
      'attack' => 35,
      'defense' => 30,
      'poke_type' => 'bug',
      'moves' => [
         'poison sting'
      ],
    },
    '13' => {
      'name' => 'Pidgey',
      'attack' => 45,
      'defense' => 40,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'gust'
      ],
    },
    '14' => {
      'name' => 'Pidgeotto',
      'attack' => 60,
      'defense' => 55,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'gust',
         'wing attack'
      ],
    },
    '15' => {
      'name' => 'Pidgeot',
      'attack' => 80,
      'defense' => 75,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'gust',
         'wing attack'
      ],
    },
    '16' => {
      'name' => 'Rattata',
      'attack' => 56,
      'defense' => 35,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'hyper fang'
      ],
    },
    '17' => {
      'name' => 'Raticate',
      'attack' => 81,
      'defense' => 60,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'hyper fang'
      ],
    },
    '18' => {
      'name' => 'Spearow',
      'attack' => 60,
      'defense' => 30,
      'poke_type' => 'normal',
      'moves' => [
         'peck'
      ],
    },
    '19' => {
      'name' => 'Fearow',
      'attack' => 90,
      'defense' => 65,
      'poke_type' => 'normal',
      'moves' => [
         'peck',
         'drill peck'
      ],
    },
    '20' => {
      'name' => 'Ekans',
      'attack' => 60,
      'defense' => 44,
      'poke_type' => 'poison',
      'moves' => [
         'poison sting',
         'bite'
      ],
    },
    '21' => {
      'name' => 'Arbok',
      'attack' => 85,
      'defense' => 69,
      'poke_type' => 'poison',
      'moves' => [
         'poison sting',
         'bite',
         'acid'
      ],
    },
    '22' => {
      'name' => 'Pikachu',
      'attack' => 55,
      'defense' => 40,
      'poke_type' => 'electric',
      'moves' => [
        'growl',
        'electro ball',
        'feint'
      ]
    },
    '23' => {
      'name' => 'Raichu',
      'attack' => 90,
      'defense' => 55,
      'poke_type' => 'electric',
      'moves' => [
         'thundershock',
         'thunderbolt'
      ],
    },
    '24' => {
      'name' => 'Sandshrew',
      'attack' => 75,
      'defense' => 85,
      'poke_type' => 'ground',
      'moves' => [
         'scratch',
         'poison sting'
      ],
    },
    '25' => {
      'name' => 'Sandslash',
      'attack' => 100,
      'defense' => 110,
      'poke_type' => 'ground',
      'moves' => [
         'scratch',
         'poison sting',
         'slash',
         'swift'
      ],
    },
    '26' => {
      'name' => 'Nidorana',
      'attack' => 47,
      'defense' => 52,
      'poke_type' => 'poison',
      'moves' => [
         'scratch'
      ],
    },
    '27' => {
      'name' => 'Nidoqueen',
      'attack' => 82,
      'defense' => 87,
      'poke_type' => 'poison',
      'moves' => [
         'scratch',
         'poison sting',
         'body slam',
         'superpower'
      ],
    },
    '28' => {
      'name' => 'Nidoran',
      'attack' => 57,
      'defense' => 40,
      'poke_type' => 'poison',
      'moves' => [
         'peck'
      ],
    },
    '29' => {
      'name' => 'Nidoking',
      'attack' => 92,
      'defense' => 77,
      'poke_type' => 'poison',
      'moves' => [
         'peck',
         'poison sting',
         'megahorn'
      ],
    },
    '30' => {
      'name' => 'Ninetales',
      'attack' => 76,
      'defense' => 75,
      'poke_type' => 'fire',
      'moves' => [
         'ember'
      ],
    },
    '31' => {
      'name' => 'Zubat',
      'attack' => 45,
      'defense' => 35,
      'poke_type' => 'poison',
      'moves' => [
         'astonish',
         'bite',
         'wing attack'
      ],
    },
    '32' => {
      'name' => 'Golbat',
      'attack' => 80,
      'defense' => 70,
      'poke_type' => 'poison',
      'moves' => [
         'poison fang',
         'bite',
         'wing attack',
         'air cutter'
      ],
    },
    '33' => {
      'name' => 'Paras',
      'attack' => 70,
      'defense' => 55,
      'poke_type' => 'bug',
      'moves' => [
         'scratch'
      ],
    },
    '34' => {
      'name' => 'Parasect',
      'attack' => 95,
      'defense' => 80,
      'poke_type' => 'bug',
      'moves' => [
         'scratch',
         'slash'
      ],
    },
    '35' => {
      'name' => 'Venonat',
      'attack' => 55,
      'defense' => 50,
      'poke_type' => 'bug',
      'moves' => [
         'tackle',
         'confusion'
      ],
    },
    '36' => {
      'name' => 'Venomoth',
      'attack' => 65,
      'defense' => 60,
      'poke_type' => 'bug',
      'moves' => [
         'psybeam',
         'psychic',
         'confusion',
         'gust'
      ],
    },
    '37' => {
      'name' => 'Diglett',
      'attack' => 55,
      'defense' => 25,
      'poke_type' => 'ground',
      'moves' => [
         'scratch'
      ],
    },
    '38' => {
      'name' => 'Dugtrio',
      'attack' => 80,
      'defense' => 50,
      'poke_type' => 'ground',
      'moves' => [
         'scratch',
         'slash',
         'earthquake'
      ],
    },
    '39' => {
      'name' => 'Meowth',
      'attack' => 45,
      'defense' => 35,
      'poke_type' => 'normal',
      'moves' => [
         'scratch',
         'bite'
      ],
    },
    '40' => {
      'name' => 'Persian',
      'attack' => 70,
      'defense' => 60,
      'poke_type' => 'normal',
      'moves' => [
         'scratch',
         'bite',
         'slash'
      ],
    },
    '41' => {
      'name' => 'Psyduck',
      'attack' => 52,
      'defense' => 48,
      'poke_type' => 'water',
      'moves' => [
         'scratch',
         'confusion'
      ],
    },
    '42' => {
      'name' => 'Golduck',
      'attack' => 82,
      'defense' => 78,
      'poke_type' => 'water',
      'moves' => [
         'scratch',
         'confusion',
         'hydro pump'
      ],
    },
    '43' => {
      'name' => 'Mankey',
      'attack' => 80,
      'defense' => 35,
      'poke_type' => 'fighting',
      'moves' => [
         'scratch',
         'low kick',
         'karate chop'
      ],
    },
    '44' => {
      'name' => 'Primeape',
      'attack' => 105,
      'defense' => 60,
      'poke_type' => 'fighting',
      'moves' => [
         'scratch',
         'low kick',
         'karate chop',
         'cross chop'
      ],
    },
    '45' => {
      'name' => 'Arcanine',
      'attack' => 110,
      'defense' => 80,
      'poke_type' => 'fire',
      'moves' => [
         'bite',
         'ember'
      ],
    },
    '46' => {
      'name' => 'Poliwag',
      'attack' => 50,
      'defense' => 40,
      'poke_type' => 'water',
      'moves' => [
         'bubble',
         'water gun'
      ],
    },
    '47' => {
      'name' => 'Poliwrath',
      'attack' => 85,
      'defense' => 95,
      'poke_type' => 'water',
      'moves' => [
         'water gun'
      ],
    },
    '48' => {
      'name' => 'Alakazam',
      'attack' => 50,
      'defense' => 45,
      'poke_type' => 'psychic',
      'moves' => [
         'confusion',
         'psybeam',
         'psychic'
      ],
    },
    '49' => {
      'name' => 'Machop',
      'attack' => 80,
      'defense' => 50,
      'poke_type' => 'fighting',
      'moves' => [
         'low kick',
         'karate chop'
      ],
    },
    '50' => {
      'name' => 'Machamp',
      'attack' => 130,
      'defense' => 80,
      'poke_type' => 'fighting',
      'moves' => [
         'low kick',
         'karate chop',
         'cross chop',
         'dynamicpunch'
      ],
    },
    '51' => {
      'name' => 'Bellsprout',
      'attack' => 75,
      'defense' => 35,
      'poke_type' => 'grass',
      'moves' => [
         'vine whip'
      ],
    },
    '52' => {
      'name' => 'Victreebel',
      'attack' => 105,
      'defense' => 65,
      'poke_type' => 'grass',
      'moves' => [
         'vine whip',
         'razor leaf'
      ],
    },
    '53' => {
      'name' => 'Tentacool',
      'attack' => 40,
      'defense' => 35,
      'poke_type' => 'water',
      'moves' => [
         'poison sting',
         'constrict',
         'acid',
         'bubblebeam'
      ],
    },
    '54' => {
      'name' => 'Tentacruel',
      'attack' => 70,
      'defense' => 65,
      'poke_type' => 'water',
      'moves' => [
         'hydro pump',
         'constrict',
         'acid',
         'bubblebeam'
      ],
    },
    '55' => {
      'name' => 'Geodude',
      'attack' => 80,
      'defense' => 100,
      'poke_type' => 'rock',
      'moves' => [
         'tackle',
         'rock throw'
      ],
    },
    '56' => {
      'name' => 'Golem',
      'attack' => 110,
      'defense' => 130,
      'poke_type' => 'rock',
      'moves' => [
         'tackle',
         'rock throw',
         'earthquake'
      ],
    },
    '57' => {
      'name' => 'Ponyta',
      'attack' => 85,
      'defense' => 55,
      'poke_type' => 'fire',
      'moves' => [
         'ember',
         'stomp'
      ],
    },
    '58' => {
      'name' => 'Rapidash',
      'attack' => 100,
      'defense' => 70,
      'poke_type' => 'fire',
      'moves' => [
         'ember',
         'stomp',
         'fire blast'
      ],
    },
    '59' => {
      'name' => 'Slowpoke',
      'attack' => 65,
      'defense' => 65,
      'poke_type' => 'water',
      'moves' => [
         'tackle',
         'water gun',
         'confusion',
         'headbutt'
      ],
    },
    '60' => {
      'name' => 'Slowbro',
      'attack' => 75,
      'defense' => 110,
      'poke_type' => 'water',
      'moves' => [
         'psychic',
         'water gun',
         'confusion',
         'headbutt'
      ],
    },
    '61' => {
      'name' => 'Magnemite',
      'attack' => 35,
      'defense' => 70,
      'poke_type' => 'electric',
      'moves' => [
         'tackle',
         'thundershock',
         'spark'
      ],
    },
    '62' => {
      'name' => 'Magneton',
      'attack' => 60,
      'defense' => 95,
      'poke_type' => 'electric',
      'moves' => [
         'tackle',
         'thundershock',
         'spark',
         'zap cannon'
      ],
    },
    '63' => {
      'name' => 'Farfetch\'d',
      'attack' => 65,
      'defense' => 55,
      'poke_type' => 'normal',
      'moves' => [
         'peck',
         'slash'
      ],
    },
    '64' => {
      'name' => 'Doduo',
      'attack' => 85,
      'defense' => 45,
      'poke_type' => 'normal',
      'moves' => [
         'peck'
      ],
    },
    '65' => {
      'name' => 'Dodrio',
      'attack' => 110,
      'defense' => 70,
      'poke_type' => 'normal',
      'moves' => [
         'peck',
         'drill peck'
      ],
    },
    '66' => {
      'name' => 'Seel',
      'attack' => 45,
      'defense' => 55,
      'poke_type' => 'water',
      'moves' => [
         'headbutt',
         'icy wind',
         'aurora beam'
      ],
    },
    '67' => {
      'name' => 'Dewgong',
      'attack' => 70,
      'defense' => 80,
      'poke_type' => 'water',
      'moves' => [
         'ice beam',
         'headbutt',
         'icy wind',
         'aurora beam'
      ],
    },
    '68' => {
      'name' => 'Grimer',
      'attack' => 80,
      'defense' => 50,
      'poke_type' => 'poison',
      'moves' => [
         'pound',
         'sludge'
      ],
    },
    '69' => {
      'name' => 'Muk',
      'attack' => 105,
      'defense' => 75,
      'poke_type' => 'poison',
      'moves' => [
         'pound',
         'sludge',
         'sludge bomb'
      ],
    },
    '70' => {
      'name' => 'Cloyster',
      'attack' => 95,
      'defense' => 180,
      'poke_type' => 'water',
      'moves' => [
         'aurora beam'
      ],
    },
    '71' => {
      'name' => 'Gastly',
      'attack' => 35,
      'defense' => 30,
      'poke_type' => 'ghost',
      'moves' => [
         'tackle',
         'lick'
      ],
    },
    '72' => {
      'name' => 'Gengar',
      'attack' => 65,
      'defense' => 60,
      'poke_type' => 'ghost',
      'moves' => [
         'tackle',
         'lick',
         'shadow punch',
         'shadow ball'
      ],
    },
    '73' => {
      'name' => 'Onix',
      'attack' => 45,
      'defense' => 160,
      'poke_type' => 'rock',
      'moves' => [
         'iron tail',
         'rock throw',
         'dragonbreath',
         'slam'
      ],
    },
    '74' => {
      'name' => 'Drowzee',
      'attack' => 48,
      'defense' => 45,
      'poke_type' => 'psychic',
      'moves' => [
         'pound',
         'confusion',
         'headbutt'
      ],
    },
    '75' => {
      'name' => 'Hypno',
      'attack' => 73,
      'defense' => 70,
      'poke_type' => 'psychic',
      'moves' => [
         'pound',
         'confusion',
         'headbutt',
         'psychic'
      ],
    },
    '76' => {
      'name' => 'Krabby',
      'attack' => 105,
      'defense' => 90,
      'poke_type' => 'water',
      'moves' => [
         'bubble',
         'vicegrip',
         'mud shot',
         'stomp'
      ],
    },
    '77' => {
      'name' => 'Kingler',
      'attack' => 130,
      'defense' => 115,
      'poke_type' => 'water',
      'moves' => [
         'stomp',
         'crabhammer',
         'vicegrip',
         'mud shot'
      ],
    },
    '78' => {
      'name' => 'Voltorb',
      'attack' => 30,
      'defense' => 50,
      'poke_type' => 'electric',
      'moves' => [
         'tackle',
         'spark'
      ],
    },
    '79' => {
      'name' => 'Electrode',
      'attack' => 50,
      'defense' => 70,
      'poke_type' => 'electric',
      'moves' => [
         'tackle',
         'spark',
         'swift'
      ],
    },
    '80' => {
      'name' => 'Exeggutor',
      'attack' => 95,
      'defense' => 85,
      'poke_type' => 'grass',
      'moves' => [
         'confusion',
         'stomp',
         'egg bomb'
      ],
    },
    '81' => {
      'name' => 'Cubone',
      'attack' => 50,
      'defense' => 95,
      'poke_type' => 'ground',
      'moves' => [
         'bone club',
         'headbutt'
      ],
    },
    '82' => {
      'name' => 'Marowak',
      'attack' => 80,
      'defense' => 110,
      'poke_type' => 'ground',
      'moves' => [
         'bone club',
         'headbutt'
      ],
    },
    '83' => {
      'name' => 'Hitmonlee',
      'attack' => 120,
      'defense' => 53,
      'poke_type' => 'fighting',
      'moves' => [
         'rolling kick'
      ],
    },
    '84' => {
      'name' => 'Hitmonchan',
      'attack' => 105,
      'defense' => 79,
      'poke_type' => 'fighting',
      'moves' => [
         'mega punch',
         'ice punch',
         'fire punch',
         'sky uppercut'
      ],
    },
    '85' => {
      'name' => 'Lickitung',
      'attack' => 55,
      'defense' => 75,
      'poke_type' => 'normal',
      'moves' => [
         'lick',
         'stomp',
         'slam'
      ],
    },
    '86' => {
      'name' => 'Koffing',
      'attack' => 65,
      'defense' => 95,
      'poke_type' => 'poison',
      'moves' => [
         'tackle',
         'smog',
         'sludge'
      ],
    },
    '87' => {
      'name' => 'Weezing',
      'attack' => 90,
      'defense' => 120,
      'poke_type' => 'poison',
      'moves' => [
         'tackle',
         'smog',
         'sludge'
      ],
    },
    '88' => {
      'name' => 'Rhyhorn',
      'attack' => 85,
      'defense' => 95,
      'poke_type' => 'ground',
      'moves' => [
         'horn attack',
         'stomp'
      ],
    },
    '89' => {
      'name' => 'Rhydon',
      'attack' => 130,
      'defense' => 120,
      'poke_type' => 'ground',
      'moves' => [
         'horn attack',
         'stomp',
         'earthquake',
         'megahorn'
      ],
    },
    '90' => {
      'name' => 'Chansey',
      'attack' => 5,
      'defense' => 5,
      'poke_type' => 'normal',
      'moves' => [
         'pound',
         'egg bomb'
      ],
    },
    '91' => {
      'name' => 'Tangela',
      'attack' => 55,
      'defense' => 115,
      'poke_type' => 'grass',
      'moves' => [
         'constrict',
         'vine whip',
         'slam'
      ],
    },
    '92' => {
      'name' => 'Kangaskhan',
      'attack' => 95,
      'defense' => 80,
      'poke_type' => 'normal',
      'moves' => [
         'bite',
         'mega punch',
         'dizzy punch'
      ],
    },
    '93' => {
      'name' => 'Horsea',
      'attack' => 40,
      'defense' => 70,
      'poke_type' => 'water',
      'moves' => [
         'bubble',
         'water gun',
         'twister'
      ],
    },
    '94' => {
      'name' => 'Seadra',
      'attack' => 65,
      'defense' => 95,
      'poke_type' => 'water',
      'moves' => [
         'bubble',
         'water gun',
         'twister',
         'hydro pump'
      ],
    },
    '95' => {
      'name' => 'Goldeen',
      'attack' => 67,
      'defense' => 60,
      'poke_type' => 'water',
      'moves' => [
         'peck',
         'horn attack'
      ],
    },
    '96' => {
      'name' => 'Seaking',
      'attack' => 92,
      'defense' => 65,
      'poke_type' => 'water',
      'moves' => [
         'peck',
         'horn attack',
         'waterfall',
         'megahorn'
      ],
    },
    '97' => {
      'name' => 'Starmie',
      'attack' => 75,
      'defense' => 85,
      'poke_type' => 'water',
      'moves' => [
         'water gun',
         'swift'
      ],
    },
    '98' => {
      'name' => 'Mr. mime',
      'attack' => 45,
      'defense' => 65,
      'poke_type' => 'psychic',
      'moves' => [
         'confusion',
         'magical leaf',
         'psybeam',
         'psychic'
      ],
    },
    '99' => {
      'name' => 'Scyther',
      'attack' => 110,
      'defense' => 80,
      'poke_type' => 'bug',
      'moves' => [
         'wing attack',
         'slash'
      ],
    },
    '100' => {
      'name' => 'Jynx',
      'attack' => 50,
      'defense' => 35,
      'poke_type' => 'ice',
      'moves' => [
         'body slam',
         'blizzard',
         'powder snow',
         'ice punch'
      ],
    },
    '101' => {
      'name' => 'Electabuzz',
      'attack' => 83,
      'defense' => 57,
      'poke_type' => 'electric',
      'moves' => [
         'thunderpunch',
         'swift',
         'thunderbolt',
         'thunder'
      ],
    },
    '102' => {
      'name' => 'Magmar',
      'attack' => 95,
      'defense' => 57,
      'poke_type' => 'fire',
      'moves' => [
         'fire blast',
         'smog',
         'fire punch',
         'flamethrower'
      ],
    },
    '103' => {
      'name' => 'Pinsir',
      'attack' => 125,
      'defense' => 100,
      'poke_type' => 'bug',
      'moves' => [
         'vicegrip'
      ],
    },
    '104' => {
      'name' => 'Tauros',
      'attack' => 100,
      'defense' => 95,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'horn attack'
      ],
    },
    '105' => {
      'name' => 'Magikarp',
      'attack' => 10,
      'defense' => 55,
      'poke_type' => 'water',
      'moves' => [
         'tackle'
      ],
    },
    '106' => {
      'name' => 'Gyarados',
      'attack' => 125,
      'defense' => 79,
      'poke_type' => 'water',
      'moves' => [
         'bite',
         'twister',
         'hydro pump'
      ],
    },
    '107' => {
      'name' => 'Lapras',
      'attack' => 85,
      'defense' => 80,
      'poke_type' => 'water',
      'moves' => [
         'water gun',
         'body slam',
         'ice beam',
         'hydro pump'
      ],
    },
    '108' => {
      'name' => 'Eevee',
      'attack' => 55,
      'defense' => 50,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'bite'
      ],
    },
    '109' => {
      'name' => 'Jolteon',
      'attack' => 65,
      'defense' => 60,
      'poke_type' => 'electric',
      'moves' => [
         'tackle',
         'thundershock',
         'thunder'
      ],
    },
    '110' => {
      'name' => 'Flareon',
      'attack' => 130,
      'defense' => 60,
      'poke_type' => 'fire',
      'moves' => [
         'flamethrower',
         'ember',
         'bite',
         'smog'
      ],
    },
    '111' => {
      'name' => 'Porygon',
      'attack' => 60,
      'defense' => 70,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'psybeam',
         'zap cannon'
      ],
    },
    '112' => {
      'name' => 'Omanyte',
      'attack' => 40,
      'defense' => 100,
      'poke_type' => 'rock',
      'moves' => [
         'constrict',
         'bite',
         'water gun',
         'mud shot'
      ],
    },
    '113' => {
      'name' => 'Omastar',
      'attack' => 60,
      'defense' => 125,
      'poke_type' => 'rock',
      'moves' => [
         'ancientpower',
         'hydro pump',
         'water gun',
         'mud shot'
      ],
    },
    '114' => {
      'name' => 'Kabuto',
      'attack' => 80,
      'defense' => 90,
      'poke_type' => 'rock',
      'moves' => [
         'scratch',
         'mud shot'
      ],
    },
    '115' => {
      'name' => 'Kabutops',
      'attack' => 115,
      'defense' => 105,
      'poke_type' => 'rock',
      'moves' => [
         'scratch',
         'mud shot',
         'slash',
         'ancientpower'
      ],
    },
    '116' => {
      'name' => 'Aerodactyl',
      'attack' => 105,
      'defense' => 65,
      'poke_type' => 'rock',
      'moves' => [
         'wing attack',
         'bite',
         'ancientpower'
      ],
    },
    '117' => {
      'name' => 'Snorlax',
      'attack' => 110,
      'defense' => 65,
      'poke_type' => 'normal',
      'moves' => [
         'tackle',
         'headbutt',
         'snore',
         'body slam'
      ],
    },
    '118' => {
      'name' => 'Articuno',
      'attack' => 85,
      'defense' => 100,
      'poke_type' => 'ice',
      'moves' => [
         'gust',
         'powder snow',
         'ice beam',
         'blizzard'
      ],
    },
    '119' => {
      'name' => 'Zapdos',
      'attack' => 90,
      'defense' => 85,
      'poke_type' => 'electric',
      'moves' => [
         'peck',
         'thundershock',
         'drill peck',
         'thunder'
      ],
    },
    '120' => {
      'name' => 'Moltres',
      'attack' => 100,
      'defense' => 90,
      'poke_type' => 'fire',
      'moves' => [
         'wing attack',
         'ember',
         'flamethrower',
         'heat wave'
      ],
    },
    '121' => {
      'name' => 'Dratini',
      'attack' => 64,
      'defense' => 45,
      'poke_type' => 'dragon',
      'moves' => [
         'twister',
         'slam'
      ],
    },
    '122' => {
      'name' => 'Dragonair',
      'attack' => 84,
      'defense' => 65,
      'poke_type' => 'dragon',
      'moves' => [
         'twister',
         'slam'
      ],
    },
    '123' => {
      'name' => 'Dragonite',
      'attack' => 134,
      'defense' => 95,
      'poke_type' => 'dragon',
      'moves' => [
         'twister',
         'slam',
         'wing attack'
      ],
    },
    '124' => {
      'name' => 'Mewtwo',
      'attack' => 110,
      'defense' => 90,
      'poke_type' => 'psychic',
      'moves' => [
         'confusion',
         'swift',
         'psychic'
      ],
    },
    '125' => {
      'name' => 'Mew',
      'attack' => 100,
      'defense' => 100,
      'poke_type' => 'psychic',
      'moves' => [
         'pound',
         'mega punch',
         'psychic',
         'ancientpower'
      ],
    }
  }

 

 pokemon.map do |num, stats|
    poke = Pokemon.create!(
      name: stats['name'], 
      attack: stats['attack'], 
      defense: stats['defense'], 
      poke_type: stats['poke_type'], 
      image_url: "#{num}.svg")
    stats['moves'].each do |move|
      if !Move.where(name: move).present?
        Move.create!(name: move)
      end
      PokeMove.create!(pokemon_id: poke.id, move_id: Move.find_by(name: move).id)
    end
  end



  
  Pokemon.all.each do |pokemon|
    3.times do  
      create_random_item!(pokemon) 
    end
  end
end
