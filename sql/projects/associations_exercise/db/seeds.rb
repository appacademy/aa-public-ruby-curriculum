# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
ActiveRecord::Base.transaction do
  # These `destroy_all` commands are not necessary if you use `rails
  # db:seed:replant`. If they are present when you run `db:seed:replant`,
  # however, the command will essentially just destroy the tables twice,
  # resulting in a small increase in execution time but no other ill effects.
  puts "Destroying tables..."
  Enrollment.destroy_all
  Course.destroy_all
  User.destroy_all

  # Reset the id (i.e., primary key) counters for each table to start at 1
  # (helpful for debugging)
  puts "Resetting primary keys..."
  %w(users courses enrollments).each do |table_name|
    ApplicationRecord.connection.reset_pk_sequence!(table_name)
  end

  puts "Populating seed data..."
  user1 = User.create!(name: 'CJ')
  user2 = User.create!(name: 'Flarnie')
  user3 = User.create!(name: 'Jeff')
  user4 = User.create!(name: 'Georges St. Pierre')
  user5 = User.create!(name: 'Ned')

  course1 = Course.create!(name: 'Ruby 101', instructor_id: user5.id)
  course2 = Course.create!(name: 'Ruby 102', instructor_id: user5.id, prereq_id: course1.id)

  Enrollment.create!(student_id: user3.id, course_id: course1.id)
  Enrollment.create!(student_id: user4.id, course_id: course1.id)
  Enrollment.create!(student_id: user1.id, course_id: course2.id)
  Enrollment.create!(student_id: user2.id, course_id: course2.id)

  puts "Done!"
end
