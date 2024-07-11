class Api::RoomsController < ApplicationController
  before_action :require_logged_in, except: [:index]

  def index
    @rooms = Room.all
  end

  def show
    @room = Room.find(params[:id])
    # Your code here
  end

  def create
    @room = Room.new(room_params)

    if @room.save
      render '_room', locals: { room: @room }
    else
      render json: @room.errors.full_messages, status: 422
    end
  end

  def destroy
    @room = Room.find(params[:id])
    @room.destroy
    render json: nil, status: :ok
  end

  private

  def room_params
    params.require(:room).permit(:name, :owner_id)
  end
end