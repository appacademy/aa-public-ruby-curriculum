require 'pg'
require 'faker'


def execute(sql)
  conn = PG::Connection.open(:dbname => 'meowtime')
  query_result = conn.exec(sql).values
  conn.close
  
  puts query_result
end

def cat_generator
  5000.times do |t|
    first = (Faker::Name.first_name) 
    breed = Faker::Cat.breed
    color = Faker::Color.color_name.split(" ")[-1].capitalize
    new_cat = "#{first}	#{color}	#{breed}"
    puts new_cat
  end
end

def toy_generator
  20.times do |t|
    name = Faker::SlackEmoji.people.delete(":").split("_").join(" ").capitalize
    price = Faker::Number.number(2)
    color = Faker::Color.color_name.split(" ")[-1].capitalize
    new_toy = "#{name}	#{color}	#{price}"
    puts new_toy
  end
  20.times do |t|
    name = Faker::SlackEmoji.nature.delete(":").split("_").join(" ").capitalize
    price = Faker::Number.number(2)
    color = Faker::Color.color_name.split(" ")[-1].capitalize
    new_toy = "#{name}	#{color}	#{price}"
    puts new_toy
  end
  20.times do |t|
    name = Faker::SlackEmoji.celebration.delete(":").split("_").join(" ").capitalize
    price = Faker::Number.number(2)
    color = Faker::Color.color_name.split(" ")[-1].capitalize
    new_toy = "#{name}	#{color}	#{price}"
    puts new_toy
  end
  20.times do |t|
    name = Faker::SlackEmoji.travel_and_places.delete(":").split("_").join(" ").capitalize
    price = Faker::Number.number(2)
    color = Faker::Color.color_name.split(" ")[-1].capitalize
    new_toy = "#{name}	#{color}	#{price}"
    puts new_toy
  end
  20.times do |t|
    name = Faker::SlackEmoji.emoji.delete(":").split("_").join(" ").capitalize
    price = Faker::Number.number(2)
    color = Faker::Color.color_name.split(" ")[-1].capitalize
    new_toy = "#{name}	#{color}	#{price}"
    puts new_toy
  end
end


def cat_toy_generator
  5000.times do |t|
    cat_id = Faker::Number.between(1, 10000)
    toy_id = Faker::Number.between(1, 10000)
    new_cat_toy = "#{cat_id}	#{toy_id}"
    puts new_cat_toy
  end
end
