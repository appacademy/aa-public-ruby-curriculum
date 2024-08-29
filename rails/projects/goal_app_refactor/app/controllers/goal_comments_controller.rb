class GoalCommentsController < ApplicationController
  def create
    @comment = GoalComment.new(comment_params)
    @comment.author_id = current_user.id

    if @comment.save
      flash[:notices] = ['Comment saved!']
    else
      flash[:errors] = @comment.errors.full_messages
    end

    redirect_back fallback_location: users_url
  end

  private

  def comment_params
    params.require(:comment).permit(:goal_id, :body)
  end

end
