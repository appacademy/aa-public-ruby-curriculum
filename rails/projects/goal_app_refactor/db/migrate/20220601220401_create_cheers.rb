class CreateCheers < ActiveRecord::Migration[7.0]
  def change
    create_table :cheers do |t|
      t.references :giver, null: false, foreign_key: { to_table: :users }
      t.references :goal, null: false, foreign_key: true, index: false

      t.timestamps
    end
    add_index :cheers, %i(goal_id giver_id), unique: true
  end
end
