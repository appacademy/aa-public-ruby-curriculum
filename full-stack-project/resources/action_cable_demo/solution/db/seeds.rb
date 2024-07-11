# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

%w(users rooms messages mentions).each do |table_name|
  ApplicationRecord.connection.reset_pk_sequence! table_name
end

users = ['garfield', 'sennacy'].map do |name|
  User.create!(username: name, password: '123456')
end

rooms = users.map do |user|
  user.owned_rooms.create!(name: "#{user.username.capitalize}'s First Room")
end

users.each do |user|
  rooms.each do |room|
    user.messages.create(room: room, body: 'hello')
  end
end