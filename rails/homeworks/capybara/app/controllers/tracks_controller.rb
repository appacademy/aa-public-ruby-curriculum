class TracksController < ApplicationController
  before_action :require_admin, only: %i(new, create, edit, update, destroy)
  before_action :set_track, only: %i(show edit update destroy)

  def show
  end

  def new
    @album = Album.find(params[:album_id])
    @track = Track.new(album_id: params[:album_id])
  end

  def create
    @track = Track.new(track_params)

    if @track.save
      redirect_to track_url(@track)
    else
      @album = @track.album
      flash.now[:errors] = @track.errors.full_messages
      render :new
    end
  end

  def edit
  end

  def update
    if @track.update(track_params)
      redirect_to track_url(@track)
    else
      flash.now[:errors] = @track.errors.full_messages
      render :edit
    end
  end

  def destroy
    @track.destroy
    redirect_to album_url(@track.album_id)
  end

  private

  def set_track
    @track = Track.find(params[:id])
  end

  def track_params
    params.require(:track).permit(:album_id, :bonus, :lyrics, :title, :ord)
  end
end
