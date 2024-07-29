class SessionsController < ApplicationController
  skip_before_action :require_logged_in, only: %i(new create)
  
  def new
  end

  def create
    user = User.find_by_credentials(
      params[:user][:email],
      params[:user][:password]
    )

    if user.nil?
      flash.now[:errors] = ["Invalid credentials."]
      render :new

    # Notice you have User#activated? even though you didn't define it!
    # Rails gives you this method for free because it matches a column name.
    elsif !user.activated?
      flash.now[:errors] = ['You must activate your account first! Check your email.']
      render :new
    else
      login!(user)
      redirect_to root_url
    end
  end

  def destroy
    current_user.try(:reset_session_token!)
    session[:session_token] = nil

    redirect_to new_session_url
  end
end