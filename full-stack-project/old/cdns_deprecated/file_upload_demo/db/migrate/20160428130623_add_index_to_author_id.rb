class AddIndexToAuthorId < ActiveRecord::Migration
  def change
    add_index :tweets, :author_id
  end
end
