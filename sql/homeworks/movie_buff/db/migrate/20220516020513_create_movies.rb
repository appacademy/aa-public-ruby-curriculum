class CreateMovies < ActiveRecord::Migration[7.0]
  def change
    create_table :movies do |t|
      t.string :title, null: false, index: true
      t.integer :yr, null: false
      t.float :score, null: false
      t.integer :votes, null: false
      t.references :director, foreign_key: { to_table: :actors }

      t.timestamps
    end
  end
end
