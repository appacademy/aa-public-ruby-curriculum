class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  helper_method :current_user, :current_user_name, :current_user_id

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def login!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def current_user_id
    current_user ? current_user.id : nil
  end

  def current_user_name
    current_user ? current_user.username : nil
  end

  # Before filters

  def require_current_user!
    redirect_to new_user_url unless current_user
  end

  def require_no_current_user!
    redirect_to root_url if current_user
  end
end