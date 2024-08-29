class NotesController < ApplicationController
  def create
    note = current_user.notes.new(note_params)
    note.save
    flash[:errors] = note.errors.full_messages
    redirect_to track_url(note.track_id)
  end

  def destroy
    # note = current_user.notes.find(params[:id])
    note = Note.find(params[:id])
    note.destroy if current_user.admin? || note.author == current_user
    redirect_to track_url(note.track_id)
  end

  private
  
  def note_params
    params.require(:note).permit(:content, :track_id)
  end
end