class UsersController < ApplicationController
  skip_before_action :require_logged_in, except: %i(show)
  before_action :require_admin, only: %i(index toggle_admin)

  def index
    @users = User.order(:email)
  end

  def show
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      # Uncomment these lines to enable the email activation flow
      #-------------------------------------------------------------------------
      # UserMailer.activation_email(@user).deliver_now
      # flash[:notice] = 'Successfully created your account! Check your inbox for an activation email.'
      # redirect_to new_session_url
      #-------------------------------------------------------------------------

      # And remove these lines
      #---------------------
      @user.activate!
      login!(@user)
      redirect_to root_url
      #---------------------
    else
      flash.now[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def activate
    @user = User.find_by(activation_token: params[:activation_token])
    @user.activate!
    login!(@user)
    flash[:notice] = 'Successfully activated your account!'
    redirect_to root_url
  end

  def toggle_admin
    @user = User.find(params[:id])
    @user.toggle_admin!
    redirect_to users_url
  end

  private

  def user_params
    params.require(:user).permit(:email, :password)
  end
end