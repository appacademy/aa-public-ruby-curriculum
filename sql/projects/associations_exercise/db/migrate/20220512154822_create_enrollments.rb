class CreateEnrollments < ActiveRecord::Migration[7.0]
  def change
    create_table :enrollments do |t|
      t.bigint :course_id, null: false, index: true
      t.bigint :student_id, null: false, index: true

      t.timestamps
    end
  end
end
