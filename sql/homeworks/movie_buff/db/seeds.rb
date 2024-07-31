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
  Casting.destroy_all
  Actor.destroy_all
  Movie.destroy_all

  # Reset the id (i.e., primary key) counters for each table to start at 1
  # (helpful for debugging)
  puts "Resetting primary keys..."
  %w(actors movies castings).each do |table_name|
    ApplicationRecord.connection.reset_pk_sequence!(table_name)
  end

	puts 'Loading actors...'
	require_relative 'data/actors.rb'
	puts 'Loading movies...'
	require_relative 'data/movies.rb'
	puts 'Loading castings...'
	require_relative 'data/castings.rb'
	puts "Done!"
end