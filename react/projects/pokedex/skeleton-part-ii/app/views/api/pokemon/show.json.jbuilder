json.pokemon do 
json.extract! @pokemon, :id, :name, :attack, :defense, :poke_type
  begin
    json.image_url asset_path("pokemon_snaps/#{@pokemon.image_url}")
  rescue
    json.image_url @pokemon.image_url
  end
end

json.moves do 
  @pokemon.moves.each do |move|
    json.set! move.id do
      json.extract! move, :id, :name 
    end
  end
end

if @pokemon.items.length != 0 
  json.items do 
    @pokemon.items.each do |item| 
      json.set! item.id do 
        json.extract! item, :id, :pokemon_id, :name, :price, :happiness
        json.image_url asset_path(item.image_url) 
        end
    end
  end 
else
  json.items ({})
end