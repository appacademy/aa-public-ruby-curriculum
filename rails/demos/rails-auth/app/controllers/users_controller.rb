class UsersController < ApplicationController
  before_action :require_current_user!, except: %i(create new)
  before_action :verify_current_user_access, only: %i(show)

  def create
    # sign up the user
    @user = User.new(user_params)
    if @user.save
      # redirect them to the new user's show page
      login!(@user)
      redirect_to user_url(@user)
    else
      render json: @user.errors.full_messages
    end
  end

  def new # present form for signup
  end

  def show
    # show the user's details (just their username)
    @user = current_user
  end

  private
  
  def user_params
    params.require(:user).permit(:username, :password)
  end

  def verify_current_user_access
    unless current_user.id == params[:id].to_i
      redirect_to new_session_url
    end
  end
end