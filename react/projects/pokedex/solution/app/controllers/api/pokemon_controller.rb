class Api::PokemonController < ApplicationController
  def index 
    sleep 0.5
    @pokemon = Pokemon.all 
    render :index 
  end


  def create 
    @pokemon = Pokemon.new(pokemon_params)
    if @pokemon.save 
      if !Move.pluck(:name).any?{|name| name == move_params[:move_1]}
        move1 = Move.create!(name: move_params[:move_1])
        PokeMove.create!(pokemon_id: @pokemon.id, move_id: move1.id)
      else
        PokeMove.create!(pokemon_id: @pokemon.id, move_id: Move.find_by(name: move_params[:move_1]).id)
      end
      if !Move.pluck(:name).any?{|name| name == move_params[:move_2]}
        move2 = Move.create!(name: move_params[:move_2])
        PokeMove.create!(pokemon_id: @pokemon.id, move_id: move2.id)
      else
        PokeMove.create!(pokemon_id: @pokemon.id, move_id: Move.find_by(name: move_params[:move_2]).id)
      end
      render :show
    else
      render json: @pokemon.errors.full_messages, status: 404
    end
  end


  def show 
    sleep 0.5
    @pokemon = Pokemon.find(params[:id])
    render :show
  end

  private
  def move_params 
    params.require(:pokemon).permit(:move_1, :move_2)
  end

  def pokemon_params
    params.require(:pokemon).permit(:name, :attack, :defense, :poke_type, :image_url)
  end
end
