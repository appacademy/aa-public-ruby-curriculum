class AlbumsController < ApplicationController
  before_action :require_admin, only: %i(new, create, edit, update, destroy)
  before_action :set_album, only: %i(show edit update destroy)
  
  def show
  end

  def new
    @band = Band.find(params[:band_id])
    @album = Album.new(band_id: params[:band_id])
  end

  def create
    @album = Album.new(album_params)

    if @album.save
      redirect_to album_url(@album)
    else
      @band = @album.band
      flash.now[:errors] = @album.errors.full_messages
      render :new
    end
  end

  def edit
  end

  def update
    if @album.update(album_params)
      redirect_to album_url(@album)
    else
      flash.now[:errors] = @album.errors.full_messages
      render :edit
    end
  end

  def destroy
    @album.destroy
    redirect_to band_url(@album.band_id)
  end

  private

  def set_album
    @album = Album.find(params[:id])
  end
  
  def album_params
    params.require(:album).permit(:band_id, :live, :title, :year)
  end
end
