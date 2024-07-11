class AddAuthorIdToTweets < ActiveRecord::Migration
  def change
    add_column :tweets, :author_id, :integer, null: false
  end
end
