class Api::UsersController < ApplicationController
  before_action :require_logged_in, only: [:logout]

  def create
    @user = User.new(user_params)
    if @user.save
      _login(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def login
    if @user = User.find_by_credentials(user_params.to_h.to_options)
      _login(@user)
      render :show
    else
      render json: ['No matching user found'], status: 401
    end
  end

  def logout
    @current_user.update!(session_token: SecureRandom.base64)
    session[:session_token] = nil
    render json: nil, status: :ok
  end

  private

  def user_params
    params.require(:user).permit(:username, :password)
  end

  def _login(user)
    @current_user = user
    session[:session_token] = user.session_token
  end
end