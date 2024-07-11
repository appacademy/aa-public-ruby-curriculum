class Api::MentionsController < ApplicationController
  before_action :require_logged_in

  def index
    @mentions = current_user.mentions
      .where(read: false)
      .includes(message: [:author])
  end

  def read
    @mention = Mention.find(params[:id])
    @mention.update(read: true)
    render json: nil, status: :ok
  end
end