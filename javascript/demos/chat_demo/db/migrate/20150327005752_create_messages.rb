class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :author
      t.string :text

      t.timestamps null: false
    end
  end
end
