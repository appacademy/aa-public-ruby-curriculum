class CreateGoals < ActiveRecord::Migration[7.0]
  def change
    create_table :goals do |t|
      t.string :title, null: false
      t.boolean :private, null: false, default: false
      t.text :details
      t.boolean :completed, null: false, default: false
      t.references :author, null: false, foreign_key: { to_table: :users }

      t.timestamps
    end
    add_index :goals, :title
  end
end
