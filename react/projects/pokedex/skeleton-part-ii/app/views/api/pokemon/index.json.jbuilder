@pokemon.each do |poke|
  json.set! poke.id do
    json.extract! poke, :id, :name
    begin
    json.image_url asset_path("pokemon_snaps/#{poke.image_url}")
    rescue
    json.image_url poke.image_url
    end
  end
end
