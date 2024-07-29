class ApplicationController < ActionController::Base
  before_action :require_logged_in
  helper_method :current_user, :current_user_id, :logged_in?

  def current_user
    return nil unless session[:session_token]
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def current_user_id
    current_user ? current_user.id : nil
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    @current_user = user
    session[:session_token] = user.reset_session_token!
  end

  def require_logged_in
    redirect_to new_session_url unless current_user
  end

  def require_admin
    redirect_to root_url unless current_user&.admin?
  end
end
