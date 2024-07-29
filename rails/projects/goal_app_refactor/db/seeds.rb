# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
require 'faker'

ApplicationRecord.transaction do
  puts "Destroying tables..."
  Cheer.destroy_all
  GoalComment.destroy_all
  UserComment.destroy_all
  Goal.destroy_all
  User.destroy_all

  puts "Resetting primary keys..."
  %w(users goals user_comments goal_comments cheers).each do |table_name|
    ApplicationRecord.connection.reset_pk_sequence!(table_name)
  end

  puts "Creating users..."
  10.times do 
    User.create!(
      username: Faker::Internet.username,
      password: Faker::Internet.password(min_length: 6, max_length:  12)
    )
  end

  puts "Creating goals, comments, and cheers..."
  User.all.each do |u|
    2.times do
      g = u.goals.create!(title: "read #{Faker::Book.title}")
      g.comments.create!(author_id: User.all.sample.id, body: Faker::Company.buzzword + " goal!")
      g.cheers.create!(giver_id: User.all.sample.id)
    end
  end
  User.first.comments.create!(author: User.second, body: "Great work!")

  puts "Done!"
end