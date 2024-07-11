# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Tweet.destroy_all
User.destroy_all
Country.destroy_all

usa = Country.create!(name: "USA")
murica = Country.create!(name: "'murica")
aa = Country.create!(name: "App Academy")
argentina = Country.create!(name: "Argentina")
belgium = Country.create!(name: "Belgium")

gigi = User.create!(name: "Gigi", email: "gigi@email.com", country: usa)
daniel = User.create!(name: "Daniel", email: "daniel@email.com", country: murica)
leen = User.create!(name: "Leen", email: "leen@email.com", country: belgium)
fred = User.create!(name: "Fred", email: "fred@email.com", country: murica)
carl = User.create!(name: "Carl", email: "carl@email.com", country: usa)
tommy = User.create!(name: "Tommy", email: "tommy@email.com", country: argentina)
jonathan = User.create!(name: "Jonathan", email: "jonathan@email.com", country: aa)

users = [gigi, daniel, leen, fred, carl, tommy, jonathan]

20.times do
  body = Faker::Hipster.sentence
  Tweet.create!(author: users.sample, body: body)
end

5.times do
  body = Faker::StarWars.quote
  Tweet.create!(author: users.sample, body: body)
end

25.times do
  body = Faker::Hipster.sentence
  Tweet.create!(author: users.sample, body: body)
end
