class CreateCourses < ActiveRecord::Migration[7.0]
  def change
    create_table :courses do |t|
      t.string :name, null: false
      t.bigint :prereq_id, index: true
      t.bigint :instructor_id, null: false, index: true

      t.timestamps
    end
  end
end
