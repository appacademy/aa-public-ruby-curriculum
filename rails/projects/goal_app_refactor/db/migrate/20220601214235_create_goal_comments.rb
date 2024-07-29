class CreateGoalComments < ActiveRecord::Migration[7.0]
  def change
    create_table :goal_comments do |t|
      t.string :body, null: false
      t.references :author, null: false, foreign_key: { to_table: :users }
      t.references :goal, null: false, foreign_key: true

      t.timestamps
    end
  end
end
