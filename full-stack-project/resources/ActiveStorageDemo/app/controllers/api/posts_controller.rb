class Api::PostsController < ApplicationController
  def index
    @posts = Post.all
    render :index
  end

  def create
    post = Post.new(post_params)
    if post.save
      render json: {message: "You did it!"}
    else
      render json: post.errors.full_messages, status: 422
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :photo)
  end
end
