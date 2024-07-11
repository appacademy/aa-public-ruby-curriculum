class ApplicationController < ActionController::Base
  helper_method :current_user
  before_action { params.deep_transform_keys!(&:underscore) }

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token])
  end

  def require_logged_in
    head :unauthorized unless current_user
  end

end