# Pokedex Part 3

## Finish Pokedex Parts 1-2 Before Continuing

### Bonus: Update Pokemon

Create a new front-end route:

```
/pokemon/:id/edit
```

This route should render an edit page where you can update the properties of 
your Pokemon! Refactor your `PokemonForm` component so that it can be used to 
both create and update Pokemon. You should only have to make one new action and 
one new api util function:

* `requestUpdatePokemon` action creator
* `updatePokemon` api util function

But you should have to refactor the following pieces:

* `PokemonFormContainer`
* `PokemonForm`

## Bonus: Update Items

Add the ability to reassign items to different Pokemon. 
This time, design is up to you!
