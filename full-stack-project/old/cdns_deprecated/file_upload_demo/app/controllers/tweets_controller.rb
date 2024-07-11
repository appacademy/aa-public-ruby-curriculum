class TweetsController < ApplicationController

  def index
    @tweets = Tweet.all
  end

  def show
    @tweet = Tweet.find(params[:id])
    render :show
  end

  def new
    @tweet = Tweet.new
    render :new
  end

  def create
    @tweet = Tweet.new(tweet_params)

    if @tweet.save
      redirect_to tweet_url(@tweet.id)
    else
      render :new
    end
  end

  def edit
    @tweet = Tweet.find(params[:id])
    render :edit
  end

  def update
    @tweet = Tweet.find(params[:id])
    if @tweet.update(tweet_params)
      redirect_to tweet_url(@tweet.id)
    else
      render :edit
    end

  end

  def destroy
    Tweet.find(params[:id]).destroy
    redirect_to tweets_url
  end



  private

  def tweet_params
    params.require(:tweet).permit(:body, :author_id)
  end




end


# NAMESPACING
# Namespace your form data! ie tweet[body]
# {"tweet" => {
# "body" => "Ain't Rails Grand",
# "author_id" => 8
# }
#}

# STRONG PARAMS
# Use strong params! Tweet.new(params[:tweet]) == security problem.
# famous example that triggered the move to strong_params: the github hack!
# someone set his own user_id on Github to that of an admin.
# check it out here: https://gist.github.com/peternixey/1978249
# strong_params are only relevant for non-GET requests (where you're updating db)
# you have to specifically passlist params you want to allow

# WHAT IS PARAMS ANYWAY
# Params: a method that Rails gives you
# returns a "hash-like" object that you can index into just
# like a hash. e.g., to pull out id from params you'll do `params[:id]`
