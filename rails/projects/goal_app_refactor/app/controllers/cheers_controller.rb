class CheersController < ApplicationController
  before_action :require_current_user!

  def index
    @cheers = current_user.cheers_received
  end

  def create
    if current_user.cheer_count <= 0
      redirect_back fallback_location: users_url
      return
    end

    @cheer = Cheer.new(
      giver_id: current_user.id,
      goal_id: params[:goal_id]
    )
    if @cheer.save
      current_user.decrement_cheer_count!
      raise 'went over cheer limit' if current_user.cheer_count < 0
      goal_owner_name = Goal.find(params[:goal_id]).author.username
      flash[:notices] = ["You cheered #{goal_owner_name}'s goal!"]
    else
      flash[:errors] = @cheer.errors.full_messages
    end

    redirect_back fallback_location: users_url
  end

  private

  def cheer_params
    params.require(:cheer).permit(:giver_id, :goal_id)
  end
end
